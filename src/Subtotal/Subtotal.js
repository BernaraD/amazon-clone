import React from 'react';
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../StateProvider/StateProvider";
import { getBasketTotalCost } from "../reducer/reducer";
import {useHistory} from "react-router-dom";


function Subtotal() {

    // const history = useHistory();
    const [{basket}, dispatch] = useStateValue();

    return (
        <div className="subtotal">

            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({basket.length} items):
                            <strong> {value} </strong>
                        </p>

                        <small className="subtotal__gift">
                            <input type="checkbox"/>
                            This order contains gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotalCost(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />

            <button>Proceed to checkout</button>
        </div>
    )
}

export default Subtotal;