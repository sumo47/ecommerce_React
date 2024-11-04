import React, { useState } from 'react';
import { useGlobalCartProvider } from './components/context/cartContext';
import styled from 'styled-components';
import CartItem from './components/CartItem';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from './styles/Button';
import FormatPrice from './Helpers/FormatPrice';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

function Cart() {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();
  const { cart_Items, clearCart, total_Price, shipping_Fee } = useGlobalCartProvider();

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/pay');
      if (response.data.status === 'success') {
        setPaymentStatus('success');
      } else {
        setPaymentStatus('failure');
      }
      setShowModal(true);
    } catch (error) {
      console.log('Error:', error);
      setPaymentStatus('failure');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (paymentStatus === 'success') {
      navigate('/Products');
      clearCart();
    }
  };

  if (cart_Items.length === 0) {
    return (
      <EmptyDiv>
        <h3>Cart is empty</h3>
      </EmptyDiv>
    );
  }

  return (
    <Wrapper>
      <div className="container">
        {isAuthenticated && (
          <div className="cart-user--profile">
            <img src={user.picture} alt={user.name} />
            <h2 className="cart-user--name">{user.name}</h2>
          </div>
        )}
        <div className="cart_heading grid grid-five-column">
          <p>ITEM</p>
          <p className="cart-hide">PRICE</p>
          <p>QUANTITY</p>
          <p className="cart-hide">SUBTOTAL</p>
          <p>REMOVE</p>
        </div>
        <hr />
        <div className="cart-item">
          {cart_Items.map((cart_Item) => (
            <CartItem key={cart_Item.id} {...cart_Item} />
          ))}
        </div>
        <hr />
        <div className="cart-two-button">
          <NavLink to="/Products">
            <Button>Continue Shopping</Button>
          </NavLink>
          <Button className="btn-clear" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>
        <div className="order-total--amount">
          <div className="order-total--subdata">
            <div>
              <p>subtotal:</p>
              <p>
                <FormatPrice price={total_Price} />
              </p>
            </div>
            <div>
              <p>shipping fee:</p>
              <p>
                <FormatPrice price={shipping_Fee} />
              </p>
            </div>
            <hr />
            <div>
              <p>order total:</p>
              <p>
                <FormatPrice price={shipping_Fee + total_Price} />
              </p>
            </div>
            <div>
              <h2>Checkout</h2>
              <button onClick={handlePayment}>Confirm Payment</button>

              {/* Modal */}
              {showModal && (
                <ModalOverlay>
                  <ModalContent>
                    {paymentStatus === 'success' ? (
                      <>
                        <h3>Payment Successful!</h3>
                        <p>Your order has been placed successfully.</p>
                        <Button onClick={closeModal}>Close</Button>
                      </>
                    ) : (
                      <>
                        <h3>Payment Failed</h3>
                        <p>Unfortunately, the payment did not go through.</p>
                        <Button onClick={handlePayment}>Retry Payment</Button>
                        <Button onClick={closeModal}>Close</Button>
                      </>
                    )}
                  </ModalContent>
                </ModalOverlay>
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const EmptyDiv = styled.div`
  display: grid;
  place-items: center;
  height: 50vh;

  h3 {
    font-size: 4.2rem;
    text-transform: capitalize;
    font-weight: 300;
  }
`;

const Wrapper = styled.section`
  padding: 9rem 0;

  /* Other styles for Wrapper */

  .order-total--subdata {
    border: 0.1rem solid #f0f0f0;
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    padding: 3.2rem;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.6rem;
    color: #555;
    margin-bottom: 2rem;
  }

  button {
    width: 100%;
    margin-top: 0.8rem;
  }

  button:first-child {
    background-color: #e74c3c;
  }
`;

export default Cart;
