// src/screens/CartScreen.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, listCartItems } from '../../actions/cartActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/cart.css';
import { Link } from 'react-router-dom';

const CartScreen = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    useEffect(() => {
        if (cartItems.length === 0) {
            dispatch(listCartItems()); 
        }
    }, [dispatch, cartItems.length]);

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    return (
        <div className="container cart-container">
            <h1 className="text-center mb-4">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className='empty-cart text-center'>
                    <div className="animated-message">
                        <h2>TILL YOU HAVEN'T BOUGHT ANYTHING 😔</h2>
                        <p>Why not check out our products?</p>
                        <Link className='btn btn-primary' to='/Products'>
                            Go to Products
                        </Link>
                    </div>
                </div>
            ) : (
                <ul className="list-group">
                    {cartItems.map((item) => (
                        <li key={item.productId} className="list-group-item d-flex align-items-center">
                            <img 
                                src={`http://127.0.0.1:8000${item.product_image}`} 
                                alt={item.product_name} 
                                className="cart-item-image mr-3"
                                loading="lazy"
                            />
                            <div className="flex-grow-1">
                                <h5>{item.product_name}</h5>
                                <p>Price: ${item.product_price}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                            <button 
                                className="btn btn-danger" 
                                onClick={() => handleRemoveFromCart(item.id)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CartScreen;
