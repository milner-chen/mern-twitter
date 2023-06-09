import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../store/session';

const NavBar = () => {
    const loggedIn = useSelector(state => !!state.session.user);
    const dispatch = useDispatch();

    const logoutUser = (e) => {
        e.preventDefault();
        dispatch(logout());
    }

    // show different links depending on the user's login status
    const navLinks = () => {
        if (loggedIn) {
            return (
                <div className="links-nav">
                    <Link to={'/tweets'}>All Tweets</Link>
                    <Link to={'/profile'}>Profile</Link>
                    <Link to={'/tweets/new'}>Write a Tweet</Link>
                    <button onClick={logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div className="links-auth">
                    <Link to={'/signup'}>Signup</Link>
                    <Link to={'/login'}>Login</Link>
                </div>
            );
        }
    }

    return (
        <>
            <h1>Chirper</h1>
            { navLinks() }
        </>
    );
}

export default NavBar;