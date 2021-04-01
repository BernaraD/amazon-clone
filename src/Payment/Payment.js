import React, {useEffect, useState} from 'react';
import './Payment.css';
import {useStateValue} from "../StateProvider/StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import {Link, useHistory} from "react-router-dom";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {getBasketTotalCost} from "../reducer/reducer";
import CurrencyFormat from "react-currency-format";
import axios from "../axios/axios";
import {db} from "../firebase/firebase"


const Payment = () => {
    const [{basket, user}, dispatch] = useStateValue()
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false)
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        //generate the special Stripe secret which allows us to charge a customer correctly
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotalCost(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }, [basket])


    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            //paymentIntent = payment confirmation

            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })

            setSucceeded(true)
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
        })
    };

    const handleChange = (event) => {
        //Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : '')
    };

    return (
        <div className="payment">

            <div className="payment__container">

                <h1>
                    Checkout (<Link to="/checkout"> {basket.length} items</Link>)
                </h1>


                {/*Payment section - delivery address*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery address</h3>

                    </div>

                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>Julie, Lee</p>
                        <p>123 Summer street</p>
                        <p>New York, NY</p>
                    </div>

                </div>


                {/*Payment section -Review Items*/}
                <div className="payment__section">

                    <div className="payment__title">
                        <h3>Review items and delivery</h3>

                    </div>

                    <div className="payment__items">

                        {/*Products*/}
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                {/*Payment section - Payment method*/}
                <div className="payment__section">


                    <div className="payment__title">
                        <h3>Payment method</h3>

                    </div>

                    <div className="payment__details">

                        {/*Stripe magic*/}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <h3>Order total: {value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotalCost(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy now"}</span>
                                </button>
                            </div>

                            {/*Errors*/}
                            {error && <div>{error}</div>}

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;