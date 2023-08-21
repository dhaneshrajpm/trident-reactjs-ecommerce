import React, { useEffect } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from './CategoryPreview.module.scss';

import ProductCard from "../../components/ProductCard";
import NoMatch from "../NoMatch/NoMatch";

const CategoryPreview = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let { categoryId } = useParams();
  const products = useSelector(state => state.product.products);
  const navigate = useNavigate();

  const Category = products?.find(item => item.title.toLowerCase() === categoryId.toLowerCase());

  if (Category) {
    const { title, items } = Category;
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>
          <span role="button" tabIndex={0} className={styles.leftIcon} onClick={() => navigate('/shop')}><LeftOutlined title='Back' /></span>
          {title}
        </h2>
        <div className={styles.content}>
          {items.map(item => <ProductCard key={item.id} name={item.name} imageUrl={item.imageUrl} price={item.price} />)}
        </div>
      </div>
    )
  } else {
    return <NoMatch />
  }
};

export default CategoryPreview;