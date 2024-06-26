import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const OrderItem = ({ order }) => {
  return (
    <div>
      {/* Display the order ID */}
      <h2>Order #{order._id}</h2>

      {/* Display the order status */}
      <p>Status: {order.status}</p>

      {/* Display the total amount of the order */}
      <p>Total Amount: ${order.totalAmount}</p>

      {/* Display the date and time when the order was placed */}
      <p>Placed on: {moment(order.createdAt).format("LLL")}</p>

      {/* Link to the order details page */}
      <Link to={`/orders/${order._id}`}>View Details</Link>
    </div>
  );
};

export default OrderItem;
