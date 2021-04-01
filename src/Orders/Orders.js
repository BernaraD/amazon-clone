import React, {useEffect, useState} from 'react';
import './Orders.css';
import {db} from "../firebase/firebase"
import {useStateValue} from "../StateProvider/StateProvider";
import Order from "./Order";


function Orders() {

    const [{basket, user}, dispatch] = useStateValue()
    const [orders, setOrders] = useState([]);

    //accessing users collection, then getting specific info about user
    //user's email, and accessing order collection
    //all the orders most recent ones on the top
    //setOrders mapping through the order, array

    useEffect(() => {
        if (user) {
            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot(snapshot => (
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                ))
        } else {
            setOrders([])
        }

    }, [user])

    return (
        <div className="orders">
            <h1>Your orders</h1>
            <div className="orders__order">
                {orders?.map(order => (
                    <Order order={order}/>
                ))}
            </div>
        </div>
    )
}

export default Orders;