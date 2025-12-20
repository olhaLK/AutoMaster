import AppRoutes from './routes/AppRoutes';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import './styles/index.scss';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { restoreSession } from './store/features/auth';


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const saved = localStorage.getItem('user');
        if (saved) {
            dispatch(restoreSession(JSON.parse(saved)));
        }
    }, [dispatch]);

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
