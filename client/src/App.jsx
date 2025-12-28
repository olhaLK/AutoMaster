import AppRoutes from './routes/AppRoutes';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import './styles/index.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { restoreSession } from './store/features/auth';
import Loader from './components/layout/Loader/Loader';

function App() {
    const dispatch = useDispatch();

    const authLoading = useSelector(state => state.auth?.loading);

    useEffect(() => {
        const saved = localStorage.getItem('user');
        if (saved) {
            dispatch(restoreSession(JSON.parse(saved)));
        }
    }, [dispatch]);


    if (authLoading) {
        return <Loader />;
    }

    return (
        <div className="app-layout">
            <Header />
            <main className="app-content">
                <AppRoutes />
            </main>
            <Footer />
        </div>
    );
}

export default App;
