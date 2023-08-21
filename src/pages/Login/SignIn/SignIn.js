import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Alert, Form, Input } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import styles from './SignIn.module.scss';

import { signInWithFirebase, signInWithGooglePopup } from "../../../firestore/firestore.utils";
import { setUser } from "../../../store/userSlice";

const SignIn = () => {
  const [errorMsg, setErrorMsg] = useState();
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleResponse = (data) => {
    const from = location.state || '/';
    if ((typeof data) !== 'string') {
      dispatch(setUser(data));
      navigate(from);
    } else {
      setShowError(true)
      setErrorMsg(data);
    }
  }

  const handleOnSubmit = (values) => {
    const { email, password } = values;
    signInWithFirebase(email, password).then((userData) => {
      handleResponse(userData);
    })
  }

  const handleOnGoogleClick = () => {
    signInWithGooglePopup().then((userData) => {
      handleResponse(userData);
    });
  }

  return (
    <div className={styles.container}>
      <h2>Please enter your details to Sign-In</h2>
      <Form
        className={styles.formContainer}
        name="signInForm"
        layout="vertical"
        requiredMark={false}
        initialValues={{ remember: true }}
        onFinish={handleOnSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <div className={styles.formButtons}>
            <Button className={styles.btn} type="primary" htmlType="submit">
              SUBMIT
            </Button>
            <Button className={styles.googleBtn} type="primary" onClick={handleOnGoogleClick}>
              <GoogleOutlined />
              SIGN-IN WITH GOOGLE
            </Button>
          </div>
        </Form.Item>
      </Form>
      {showError && <Alert type="error" message={errorMsg.replace('auth/', '').replace('-', ' ')} showIcon />}
    </div>
  )
}

export default SignIn;