import React from 'react';
import { Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Checkout.module.scss';

import { CHECKOUT_TABLE_COLUMNS } from '../../constants/checkout.constants';
import { getTotalPrice } from '../../utils/helper';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (user.email) {
      navigate('/payment')
    } else {
      navigate('/signin', { state: '/checkout' })
    }
  }

  return (
    <div className={styles.container}>
      <Table
        className={styles.table}
        pagination={false}
        columns={CHECKOUT_TABLE_COLUMNS}
        dataSource={cartItems}
        sticky
      />
      <div className={styles.footer}>
        <div className={styles.total}>Total: $ {getTotalPrice(cartItems)}</div>
        <Button className={styles.checkoutBtn} disabled={getTotalPrice(cartItems) === 0} onClick={handleCheckout}>PLACE ORDER</Button>
      </div>
    </div >
  );
}

export default Checkout;