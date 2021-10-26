import React, { useContext, useState, useEffect } from 'react';
import './Login.css';
// React router
import { useHistory } from 'react-router-dom';
// AuthContext
import AuthContext from '../../store/auth-context';
// Google Button
import LoginBtn from '../../components/LoginBtn/LoginBtn';
// Logo
import Logo from '../../assets/img/logo.png';

function Login() {

    // History
    const history = useHistory();

    // User data
    const authCtx = useContext(AuthContext);
    const userData = authCtx.user;

    useEffect(() => {
        if (JSON.stringify(userData) !== '{}') {
            history.replace('/home');
        }
    }, [userData])
    
    // //  Redirect if user is logged
    // if ((JSON.stringify(userData) !== '{}')) {
    //     history.replace('/home');
    // }

    /**-- STATES --*/

    const [user, saveUser] = useState({
        email: '',
        password: ''
    });

    /**-- FUNCTIONS --*/

    // Take values
    const { email, password } = user;
    const onChange = (e) => {
        saveUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    // Submit form
    const onSubmit = (e) => {
        e.preventDefault();

        // Validation

        // Action
    }

    return (
        <>
            {/* Login */}
            <div className="user-form">

                <div className="logo-container">
                    <a href="." target="_blank">
                        <img src={Logo} alt="Logo" />
                    </a>
                </div>

                <div className="form-container">
                    <h1 data-cy="signin-header">Sign In with Google</h1>
                    <form onSubmit={onSubmit} data-cy="login-form">
                        <div className="form-field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Introduce email"
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="email">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Introduce password"
                                value={password}
                                onChange={onChange}
                            />
                        </div>

                        {/* Google Login Button */}
                        <LoginBtn  />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;
