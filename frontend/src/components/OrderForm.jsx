import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewOrder } from "../store/orderSlice";

const OrderForm = ({ products, totalPrice }) => {
  // State to hold the order data
  const [orderData, setOrderData] = useState({
    products,
    totalPrice,
  });
  const dispatch = useDispatch();

  // Handle form submission to create a new order
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createNewOrder(orderData));
      alert("Order placed successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to place order");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Place Order</button>
    </form>
  );
};

export default OrderForm;
