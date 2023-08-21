import React from 'react';
import { CloseOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import styles from './TableCell.module.scss';
import { setCartItems } from '../../store/cartSlice';


const TableCell = ({ type, product, quantity, row }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleDelete = () => {
    const tableData = cartItems.filter(item => item.product.name !== row.product.name);
    dispatch(setCartItems(tableData));
  }

  const handleAdd = () => {
    let filteredCartItems = cartItems.map(currentItem => {
      if (currentItem.product.name === row.product.name) {
        currentItem.quantity++;
      }
      return currentItem;
    });
    dispatch(setCartItems(filteredCartItems));
  }

  const handleRemove = () => {
    let filteredCartItems = cartItems.map(currentItem => {
      if (currentItem.product.name === row.product.name) {
        currentItem.quantity--;
      }
      return currentItem;
    });
    filteredCartItems = filteredCartItems.filter(item => item.quantity > 0);
    setCartItems(filteredCartItems)
  }

  if (type === 'delete') {
    return (
      <div className={styles.deleteContainer}><CloseOutlined onClick={handleDelete} /></div>
    );
  } else if (type === 'quantity') {
    return (
      <div className={styles.quantityContainer}>
        <LeftOutlined onClick={handleRemove} />
        {quantity}
        <RightOutlined onClick={handleAdd} />
      </div>
    )
  } else {
    const { imageUrl, name } = product;
    return (
      <div className={styles.productContainer}>
        <img className={styles.image} src={imageUrl} alt="" />
        <span className={styles.itemName}>{name}</span>
      </div>
    );
  }
}

export default TableCell;