import { useState } from "react";
import UserService from "../../services/userService";
import "../../styles/auth.css";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        switch (name) {
            case "username":
                setUsername(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
        UserService.login(username, password);
    };

    return (
        <div className='auth_outer_div'>
            <div className='auth_div'>
                <p>UserName: </p>
                <input
                    className='input_auth'
                    type='text'
                    name='username'
                    onChange={handleChangeInput}
                />
                <p>Password:</p>
                <input
                    className='input_auth'
                    type='password'
                    name='password'
                    onChange={handleChangeInput}
                />
                <button className='auth_button' id='login_button' onClick={handleSubmit}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
