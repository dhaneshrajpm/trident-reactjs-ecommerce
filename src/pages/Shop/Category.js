import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from './Category.module.scss';
import ProductCard from "../../components/ProductCard/ProductCard";

export const Category = () => {
  const products = useSelector(state => state.product.products)
  const navigate = useNavigate();

  return (
    <>
      {products && products.map(product => {
        const { title, items } = product;
        return (
          <div key={title} className={styles.container} to={`${title.toLowerCase()}`}>
            <div className={styles.header}>
              <span className={styles.title} role="button" tabIndex={0} onClick={() => navigate(`/shop/${title}`)}>{title.toUpperCase()}</span>
              <span className={styles.seeMoreBtn} role="button" tabIndex={1} onClick={() => navigate(`/shop/${title}`)}>see more +</span>
            </div>
            <div className={styles.content}>
              {items
                .filter((a, index) => index < 4)
                .map(item => <ProductCard className={styles.content} key={item.id} name={item.name} imageUrl={item.imageUrl} price={item.price} />
                )
              }
            </div>
          </div >
        )
      })}
    </>
  )
}

export default Category;