import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Empty } from 'antd';
import { useSelector } from 'react-redux';

import styles from './CartItems.module.scss';

const CartItems = ({ setShowCart }) => {
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleOnCheckout = () => {
    navigate('/checkout');
    setShowCart(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.cartItems}>
        {cartItems.length > 0 ? cartItems.map(item => {
          const { product: { imageUrl, name }, price, quantity } = item;
          return (
            <div key={name} className={styles.item}>
              <img className={styles.image} src={imageUrl} alt="" />
              <div className={styles.itemDescription}>
                <span className={styles.itemName}>{name}</span>
                <span className={styles.quantityAndPrice}>{quantity} X ${price}</span>
              </div>
            </div>
          )
        })
          :
          <Empty className={styles.emptyCart} image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Items in cart!" ><strong>Keep Shopping!</strong></Empty>}
      </div>
      <Button className={styles.btn} type="primary" onClick={handleOnCheckout}>
        GO TO CHECKOUT
      </Button>
    </div>
  )
}

export default CartItems;