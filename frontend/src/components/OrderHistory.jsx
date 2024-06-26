import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../store/orderSlice";
import moment from "moment";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.items);
  const orderStatus = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);

  // Fetch orders when the component mounts
  useEffect(() => {
    if (orderStatus === "idle") {
      dispatch(fetchOrders());
    }
  }, [orderStatus, dispatch]);

  if (orderStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (orderStatus === "failed") {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Order History</h1>
      {orders.map((order) => (
        <div key={order._id}>
          <h2>Order #{order._id}</h2>
          <p>Status: {order.status}</p>
          <p>Total Amount: ${order.totalAmount}</p>
          <p>Placed on: {moment(order.createdAt).format("LLL")}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
