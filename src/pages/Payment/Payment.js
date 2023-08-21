import React, { useMemo } from 'react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import cx from 'classnames';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Payment.module.scss'
import { getTotalCount, getTotalPrice } from '../../utils/helper';
import { setCartItems } from '../../store/cartSlice';

const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    []
  );

  return options;
};

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const renderSuccess = () => {
    Modal.success({
      content: 'Thank you for purchasing...',
    });
    dispatch(setCartItems([]));
    navigate('/');
  };

  const renderError = (msg) => {
    Modal.error({
      content: msg,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement)
    });
    if (error) {
      return (renderError(error.message))
    }
    renderSuccess();
  };

  return (
    <div className={styles.container}>
      <div className={styles.checkoutPreview}>
        <h4 className={styles.header}>Price Details</h4>
        <div className={styles.pricePreview}>
          <span>Items x ({getTotalCount(cartItems)})</span>
          <span>$ {getTotalPrice(cartItems)}</span>
        </div>
        <div className={styles.pricePreview}>
          <span>Delivary Fees</span>
          <span style={{ color: 'green' }}>FREE</span>
        </div>
        <hr />
        <div className={styles.overAllTotal}>Total: $ {getTotalPrice(cartItems)}</div>
      </div>
      <form onSubmit={handleSubmit} className={styles.paymentContainer}>
        <div className={cx(styles.cardElement, styles.cardNumber)}>
          Card Number
          <CardNumberElement
            className={styles.StripeElement}
            options={options}
          />
        </div>
        <label className={styles.cardDateCVC}>
          <div className={styles.cardElement}>
            Expiry Date
            <CardExpiryElement className={styles.StripeElement} options={options} />
          </div>
          <div className={styles.cardElement}>
            CVC
            <CardCvcElement className={styles.StripeElement} options={options} />
          </div>
        </label>
        <button type="submit" className={styles.button} disabled={!stripe || getTotalPrice(cartItems) === 0}>
          Pay ($ {getTotalPrice(cartItems)})
        </button>
      </form>
      <div className={styles.demo}>
        <span style={{ textDecoration: 'underline' }}>Payment test details</span>
        <span>Card No: <span style={{ color: 'red' }}>5555 5555 5555 4444</span></span>
        <span>Expiry: <span style={{ color: 'red' }}>any future Date</span></span>
        <span>CVC: <span style={{ color: 'red' }}>any number</span></span>
      </div>
    </div>
  );
}

export default Payment;