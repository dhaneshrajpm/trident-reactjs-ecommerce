import React, { useState } from "react";
import { Popover } from "antd";
import { useSelector } from "react-redux";

import styles from './Cart.module.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import CartItems from "./CartItems";
import { getTotalCount } from "../../utils/helper";

const CartIcon = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [showCart, setShowCart] = useState(false);

  const hanldeOnOpenChange = (visible) => {
    setShowCart(visible);
  }

  return (
    <Popover
      className={styles.container}
      open={showCart}
      overlay placement="bottomRight"
      onOpenChange={hanldeOnOpenChange}
      content={<CartItems setShowCart={setShowCart} />}
      trigger='click'
    >
      <ShoppingIcon className={styles.cartIcon} />
      <span className={styles.itemCount}>{getTotalCount(cartItems)}</span>
    </Popover>
  );
}

export default CartIcon;
