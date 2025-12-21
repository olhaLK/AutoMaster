import { useNavigate } from "react-router-dom";
import logo from '../../../assets/logo.png';



function Header() {
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/signin');
    }

    const handleSignUp = () => {
        navigate('/signup');
    }

    return (
        <header className="header">
            <div className="header-left">
                <a href="/">
                    <img src={logo} alt="logo" className="header-left-logo" />
                    <span className="header-left-title">AutoMaster</span>
                </a>
            </div>

            <nav className="header-menu">
                <a href="/tracking">Orders</a>
                <a href="/test-drive">Test Drives</a>
                <a href="/cars">Catalog</a>
                <a href="/">Main</a>
            </nav>

            <div className="header-signs">
                <button type="button" onClick={handleSignIn} className="header-signs-btn">Sign in</button>
                <button type="button" onClick={handleSignUp} className="header-signs-btn">Sign up</button>
            </div>
        </header>
    );
}

export default Header;