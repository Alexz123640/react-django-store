import React, { useEffect } from "react";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import  Message from "../components/Message";
import { addToCart } from "../actions/cartActions";

function CartScreen() {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const locatio = useLocation();
  const qty = locatio.state ? Number(locatio.state) : 1;
  const { id } = useParams();
  const productId = id;

  
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log("cartItems: ", cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return(
    <Row>
      
    </Row>
    )
}

export default CartScreen;
