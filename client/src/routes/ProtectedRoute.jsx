import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


export default function ProtectedRoute({ roles }) {
    const { isAuth, user, status } = useSelector((state) => state.auth);

    // Only suspend rendering while an async auth action is in progress.
    // Treat 'idle' as not-loading so that routes redirect if the user is not authenticated.
    if (status === 'loading') {
        return null;
    }

    if (!isAuth) {
        return <Navigate to='/' replace />
    }

    if (roles && !roles.includes(user?.Role)) {
        return <Navigate to='/' replace />
    }

    return <Outlet />;
}