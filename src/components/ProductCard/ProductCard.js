import React from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import styles from './ProductCard.module.scss';
import { setCartItems } from "../../store/cartSlice";

const ProductCard = ({ name, imageUrl, price }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const isExist = cartItems.find(item => item.product.name === name);
    if (isExist) {
      let filteredCartItems = cartItems.map(currentItem => {
        if (currentItem.product.name === name) {
          const existingItem = { ...currentItem };
          existingItem.quantity++;
          return existingItem;
        }
        return currentItem;
      });
      dispatch(setCartItems(filteredCartItems))
    } else {
      dispatch(setCartItems([...cartItems, { key: name, product: { name, imageUrl }, price, quantity: 1 }]))
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img className={styles.productImg} src={imageUrl} alt='product' />
        <Button className={styles.btn} onClick={handleAddToCart}>Add to Cart</Button>
      </div>
      <div className={styles.footer}>
        <span className={styles.name}>{name}</span>
        <span className={styles.price}>${price}</span>
      </div>
    </div>
  )
}

export default ProductCard;