import { useNavigate } from "react-router-dom";
import logo from '../../../assets/logo.png';
import cart from '../../../assets/cart.svg';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../../store/features/auth';



function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuth, user } = useSelector((state) => state.auth);


    const handleSignIn = () => {
        navigate('/signin');
    }

    const handleSignUp = () => {
        navigate('/signup');
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate('/signin');
    }

    const isAdmin = user?.Role === 'Admin';

    return (
        <header className="header">
            <div className="header-left">
                <a href="/">
                    <img src={logo} alt="logo" className="header-left-logo" />
                    <span className="header-left-title">AutoMaster</span>
                </a>
            </div>

            <nav className="header-menu">
                {/* guest */}
                {!isAuth && null}

                {/* user */}
                {isAuth && !isAdmin && (
                    <>
                        <a href="/tracking">Orders/Test-drives</a>
                        <a href="/cars">Catalog</a>
                        <a href="/">Main</a>
                        <a href="/cart">
                            <img src={cart} alt="cart" className="header-menu-cart" />
                        </a>
                    </>
                )}

                {/* admin */}
                {isAuth && isAdmin && (
                    <>
                        <a href="/cars">Catalog</a>
                        <a href="/tracking">Orders/Test-drives</a>
                    </>
                )}
            </nav>

            <div className="header-signs">
                {isAuth ? (
                    <>
                        <div className="header-signs-user">
                            <span className="header-signs-login">{user?.UserName}/</span>
                            <span className="header-signs-role">{user?.Role}</span>
                        </div>
                        <button type="button" onClick={handleLogout} className="header-signs-btn">Log out</button>
                    </>
                ) : (
                    <>
                      <button type="button" onClick={handleSignIn} className="header-signs-btn">Sign in</button>
                <button type="button" onClick={handleSignUp} className="header-signs-btn">Sign up</button>
                    </>
                )}
              
            </div>
        </header>
    );
}

export default Header;