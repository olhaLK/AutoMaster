import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


export default function ProtectedRoute({ roles }) {
    const { isAuth, user, status } = useSelector((state) => state.auth);

    if (status === 'idle') {
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