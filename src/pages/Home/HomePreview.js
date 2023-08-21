import React from "react";
import { Link } from "react-router-dom";

import styles from './HomePreview.module.scss';

const HomePreview = ({ title, imageUrl }) => {

  return (
    <Link className={styles.container} to={`/shop/${title}`} >
      <img className={styles.img} src={imageUrl} alt="home" />
      <div className={styles.content}>
        <span>{title.toUpperCase()}</span>
        <span>SHOP NOW</span>
      </div>
    </Link>
  );
}


export default HomePreview;