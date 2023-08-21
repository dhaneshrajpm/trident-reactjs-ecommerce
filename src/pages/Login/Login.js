import React from "react";

import styles from './Login.module.scss';
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Login = () => {
  return (
    <div className={styles.container}>
      <SignIn />
      <SignUp />
    </div>
  )
}

export default Login;