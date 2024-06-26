// Import necessary libraries and hooks
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeFromCart } from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const status = useSelector((state) => state.cart.status);
  const user = useSelector((state) => state.auth.user);

  // Fetch cart items when the component is mounted and user is authenticated
  useEffect(() => {
    if (status === "idle" && user) {
      dispatch(fetchCart());
    }
  }, [status, dispatch, user]);

  // Handle removing item from cart
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  // Display loading, cart items, or a message if the cart is empty
  let content;
  if (status === "loading") {
    content = <p>Loading...</p>;
  } else if (cartItems.length === 0) {
    content = <p>Your cart is empty.</p>;
  } else {
    content = (
      <ul>
        {cartItems.map((item) => (
          <li key={item.productId._id}>
            <h2>{item.productId.name}</h2>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleRemoveFromCart(item._id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <h1>Shopping Cart</h1>
      {content}
    </div>
  );
};

export default Cart;
