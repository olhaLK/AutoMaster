import AppRoutes from './routes/AppRoutes';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import './styles/index.scss';



function App() {
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
