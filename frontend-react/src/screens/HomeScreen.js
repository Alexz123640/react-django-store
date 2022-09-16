import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../actions/productActions";
//import axios from 'axios'

import { useEffect, useState } from "react";

function HomeScreen() {
  //const [products, setProducts] = useState([])
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  useEffect(() => {
    dispatch(listProducts());

    /*async function fetchProducts(){
      const {data}=await axios.get('http://127.0.0.1:8000/api/products/')
      setProducts(data)
    }
    fetchProducts();
    */
  }, [dispatch]);

  return (
    <div>
      <h1>Latest Products</h1>

      {loading ? (
        <h2>
          <Loader />
        </h2>
      ) : error ? (
        <h3>
          <Message variant="danger">{error}</Message>
        </h3>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={16} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
