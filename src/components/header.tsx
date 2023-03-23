import GlobalFunctions from "../services/globalFuntions";
import UserService from "../services/userService";
import "../styles/header.css";

const Header = () => {
    const cred = GlobalFunctions.getCred();

    const username = cred![0];

    return (
        <header>
            {username !== null && (
                <div className='header-left'>
                    <button onClick={(e) => GlobalFunctions.Redirection("/tests")}>Tests</button>
                </div>
            )}

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
