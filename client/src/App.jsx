import AppRoutes from './routes/AppRoutes';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import './styles/App.scss';



function App() {
  return (
    <>
     <Header />
     <AppRoutes />
     <Footer />
    </>
  )
}

export default App;
