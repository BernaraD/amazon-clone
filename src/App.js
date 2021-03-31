import './App.css';
import Header from "./Header/Header";
import Home from "./Home/Home";
import Checkout from "./Checkout/Checkout";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Login from "./Login/Login";
import {useEffect} from "react";
import {auth} from "./firebase/firebase";
import {useStateValue} from "./StateProvider/StateProvider";
import Payment from "./Payment/Payment";
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'



const promise = loadStripe('pk_test_51Ib7bhLcxKy1X3Hbmrf3I0SWpqh7nkTe3cZKzwbnx0DH99A1Tm3sMOgOq5urxcadJPaemq6edn7XiZHPlr9YWAxt004MinFz7u');


function App() {

    const [{}, dispatch] = useStateValue();


    useEffect(() => {
        //will only run once when the app component loads...

        auth.onAuthStateChanged(authUser => {
            console.log("THE USER IS >>> ", authUser);
            if (auth) {
                //the user just logged in / or was logged in
                dispatch({
                    type: 'SET_USER',
                    user: authUser
                })
            } else {
                //the user is logged out
                dispatch({
                    type: 'SIGN OUT',
                    user: null
                })
            }
        })
    }, []);

    return (
        <Router>
            <div className="app">

                <Switch>

                    {/*Login link*/}
                    <Route path="/login">
                        <Login/>
                    </Route>

                    {/*Checkout link*/}
                    <Route path="/checkout">
                        <Header/>
                        <Checkout/>
                    </Route>

                    {/*Payment page link*/}
                    <Route path="/payment">
                        <Header/>
                        <Elements stripe={promise}>
                            <Payment/>
                        </Elements>
                    </Route>

                    {/*Home page link*/}
                    <Route path="/">
                        <Header/>
                        <Home/>
                    </Route>

                </Switch>

            </div>
        </Router>
    );
}

export default App;
