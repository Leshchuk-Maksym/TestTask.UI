import GlobalFunctions from "../services/globalFuntions";
import UserService from "../services/userService";
import "../styles/header.css";

const Header = () => {
    const username = GlobalFunctions.getCred();

    return (
        <header>
            <div className='header-right'>
                {username !== null && (
                    <div className='header_auth'>
                        <span>Hello, {username}</span>
                        <button className='button' onClick={(e) => UserService.logout()}>
                            Logout
                        </button>
                    </div>
                )}
                {username === null && (
                    <div className='header_auth'>
                        <button
                            className='button'
                            onClick={(e) => GlobalFunctions.Redirection("/register")}
                        >
                            Register
                        </button>
                        <button
                            className='button'
                            onClick={(e) => GlobalFunctions.Redirection("/login")}
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
