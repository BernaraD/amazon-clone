import React, {useState} from 'react';
import "./Login.css"
import {Link, useHistory} from "react-router-dom";
import {auth} from '../firebase/firebase'


function Login() {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignIn = (e) => {
        e.preventDefault();

        //firebase login
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/')
            })
            .catch(error => alert(error.message))
    }


    const onRegister = (e) => {
        e.preventDefault();
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                console.log(auth)
                if (auth) {
                    history.push('/')
                }
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className="login">

            <Link to="/">
                <img className="login__logo"
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                />
            </Link>

            <div className="login__container">
                <h1>Sign in</h1>

                <form action="">
                    <h5>Email</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>

                    <button type="submit" className="login__signInBtn" onClick={onSignIn}>Sign in</button>
                </form>

                <p>
                    By signing in you agree to Amazon Clone's Conditions of Use & Sale.
                    Please see our Privacy Notice, our Cookies Notice and our
                    Interest-Based Ads Notice
                </p>

                <button type="submit" onClick={onRegister} className="login__registerBtn">Create Amazon account</button>

            </div>


        </div>
    )
}

export default Login;