import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import { Link } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();

  // Select products, status, and error from the Redux store
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  // Fetch products when the component is mounted
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Determine what content to display based on the status
  let content;
  if (status === "loading") {
    // Show loading message while fetching data
    content = <p>Loading...</p>;
  } else if (status === "succeeded") {
    // Show list of products when data is successfully fetched
    content = (
      <ul>
        {Array.isArray(products) &&
          products.map((product) => (
            <li key={product._id}>
              <Link to={`/products/${product._id}`}>{product.name}</Link>
            </li>
          ))}
      </ul>
    );
  } else if (status === "failed") {
    // Show error message if fetching data failed
    content = <p>{error}</p>;
  }

  // Render the product list
  return (
    <div>
      <h1>Products</h1>
      {content}
    </div>
  );
};

export default ProductList;
