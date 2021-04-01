import React from 'react';
import './CheckoutProduct.css'
import {useStateValue} from "../StateProvider/StateProvider";


function Checkout(props) {

    const [{basket}, dispatch] = useStateValue();

    const {id, image, title, price, rating, hideButton} = props;

    const removeFromBasket = () => {
        //remove the item from the cart
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id
        })
    }

    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={image}
            />

            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>

                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>

                <div className="checkoutProduct__rating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p>⭐</p>
                        ))}
                </div>

                {!hideButton && (
                    <button onClick={removeFromBasket}>Remove from cart</button>
                )}

            </div>
        </div>
    )
}

export default Checkout;