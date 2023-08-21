import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from './Navigation.module.scss';
import { ReactComponent as TridentLogo } from '../../assets/trident.svg'
import { signOutUser } from "../../firestore/firestore.utils";
import CartIcon from "../Cart";
import { setUser } from "../../store/userSlice";

const Navigation = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const handleOnSignOut = () => {
    signOutUser().then(() => dispatch(setUser({})))
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link className={styles.navLink} to={'/'} ><TridentLogo className={styles.logo} /></Link>
        <div className={styles.navRight}>
          <Link className={styles.navLink} to={'/shop'} >SHOP</Link>
          <Link className={styles.navLink} to={'/contact'} >CONTACT</Link>
          {user.email ?
            <span className={styles.navLink} role="button" onClick={handleOnSignOut} >SIGN OUT</span>
            :
            <Link className={styles.navLink} to={'/signin'} >SIGN IN</Link>
          }
          <CartIcon />
        </div>
      </div>
      <Outlet />
    </div >
  )
}

export default Navigation;