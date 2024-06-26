import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrders } from "../store/orderSlice";
import moment from "moment";

const OrderDetails = () => {
  // Extract the order ID from the URL parameters
  const { id } = useParams();
  const dispatch = useDispatch();

  // Select the specific order and order status from the Redux store
  const order = useSelector((state) =>
    state.orders.items.find((order) => order._id === id)
  );
  const orderStatus = useSelector((state) => state.orders.status);

  // Fetch the orders if the specific order is not already in the store
  useEffect(() => {
    if (!order) {
      dispatch(fetchOrders());
    }
  }, [order, dispatch]);

  // Display a loading message while the orders are being fetched
  if (orderStatus === "loading") {
    return <div>Loading...</div>;
  }

  // Display a message if the order is not found
  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div>
      {/* Display the order details */}
      <h1>Order #{order._id}</h1>
      <p>Status: {order.status}</p>
      <p>Total Amount: ${order.totalAmount}</p>
      <p>Placed on: {moment(order.createdAt).format("LLL")}</p>
      <h2>Products</h2>
      <ul>
        {/* List all products in the order */}
        {order.products.map((product) => (
          <li key={product.productId._id}>
            {product.productId.name} - {product.quantity} x ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
