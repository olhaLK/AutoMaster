import { useNavigate } from "react-router-dom";
import logo from '../../../assets/logo.png';
import cart from '../../../assets/cart.svg';



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
                <a href="/tracking">Orders/Test-drives</a>
                <a href="/cars">Catalog</a>
                <a href="/">Main</a>
                <a href="/cart">
                    <img src={cart} alt="cart" className="header-menu-cart"/>
                </a>
            </nav>

            <div className="header-signs">
                <button type="button" onClick={handleSignIn} className="header-signs-btn">Sign in</button>
                <button type="button" onClick={handleSignUp} className="header-signs-btn">Sign up</button>
            </div>
        </header>
    );
}

export default Header;