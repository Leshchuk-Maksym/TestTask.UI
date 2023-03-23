import { useState } from "react";
import UserService from "../../services/userService";
import "../../styles/auth.css";

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        switch (name) {
            case "username":
                setUsername(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
        UserService.register(username, email, password);
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
                <p>Email: </p>
                <input
                    className='input_auth'
                    type='email'
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
                    Register
                </button>
            </div>
        </div>
    );
}

export default RegisterPage;
