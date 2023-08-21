import React from "react";
import { Link } from "react-router-dom";

import styles from './Home.module.scss';

const catagories = [
  {
    id: 1,
    title: 'hats',
    imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
    route: 'shop/hats',
  },
  {
    id: 2,
    title: 'jackets',
    imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
    route: 'shop/jackets',
  },
  {
    id: 3,
    title: 'sneakers',
    imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
    route: 'shop/sneakers',
  },
  {
    id: 4,
    title: 'womens',
    imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
    route: 'shop/womens',
  },
  {
    id: 5,
    title: 'mens',
    imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
    route: 'shop/mens',
  },
];

const Home = () => {
  return (
    <div className={styles.container}>
      {catagories.map(item =>
        <Link key={item.title} className={styles.link} to={`/shop/${item.title}`} >
          <img className={styles.img} src={item.imageUrl} alt="home" />
          <div className={styles.content}>
            <span>{item.title.toUpperCase()}</span>
            <span>SHOP NOW</span>
          </div>
        </Link>
      )}
    </div>
  )
};

export default Home;