import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../login.module.css'; // Importing the CSS module

function Login() {
    const [user, setUser] = useState("");
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [Error, setError] = useState({});
    const navigate = useNavigate();

    const url = "http://localhost:8081/login";

    const ValidData = () => {
        const errors = {};

        if (Username === "" && Password === "") {
            errors.invalidUser = "Enter the username";
            errors.invalidPassword = "Enter the Password";
        } else if (!Username.endsWith("@gmail.com")) {
            errors.invalidUser = "Invalid Username";
        } else if (Username === "") {
            errors.invalidUser = "Enter the username";
        } else if (Password === "") {
            errors.invalidPassword = "Enter the password";
        }

        if (Object.keys(errors).length > 0) {
            setError(errors);
        } else {
            setError({});
            axios.post(url, {
                username: Username,
                password: Password
            })
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };

    function Nvigate() {
        if (user === "login") {
            navigate("/flightBooking", { state: { id: 1, uname: Username } });
        } else if (user === "invalid") {
            return <h5 className={styles.invalid}>Invalid Credentials</h5>;
        }
    }

    return (
        <div id="container" className={styles.container}>
            <div id='loginid' className={styles.loginForm}>
                <h2 id='loginh2' className={styles.loginHeader}>Login</h2>

                {Error.invalidUser && <p className={styles.errorMessage}>{Error.invalidUser}</p>}
                <input 
                    type="email" 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Email" 
                    required 
                    className={styles.inputBox} 
                />
                
                {Error.invalidPassword && <p className={styles.errorMessage}>{Error.invalidPassword}</p>}
                <input 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                    className={styles.inputBox} 
                />
                
                <button onClick={ValidData} className={styles.loginButton}>Login</button>
                <Nvigate />
                
                <p className={styles.registerText}>
                    <b>Don't have an account? </b><a href="/register">Register here</a>
                </p>
            </div>
        </div>
    );
}

export default Login;

