import React, { useState } from "react";
import { Alert, Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from './SignUp.module.scss';
import { signUpWithFirebase } from "../../../firestore/firestore.utils";
import { setUser } from "../../../store/userSlice";

const SignUp = () => {
  const [errorMsg, setErrorMsg] = useState();
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { email, password, confirmPassword } = values;
    if (password === confirmPassword) {
      signUpWithFirebase(email, password).then(userData => {
        if ((typeof userData !== 'string')) {
          dispatch(setUser(userData));
          navigate('/');
        } else {
          setShowError(true)
          setErrorMsg(userData);
        }
      });
    } else {
      setShowError(true)
      setErrorMsg("Password and Confirm password not matched");
    }
  }

  return (
    <div className={styles.container}>
      <h2>Please enter your details to Sign-Up</h2>
      <Form
        className={styles.formContainer}
        name="signUpForm"
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
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

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: 'Please input your confirm password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <div className={styles.formButtons}>
            <Button className={styles.btn} type="primary" htmlType="submit">
              SUBMIT
            </Button>
          </div>
        </Form.Item>
      </Form>
      {showError && <Alert type="error" message={errorMsg.replace('auth/', '').replace('-', ' ')} showIcon />}
    </div>
  )
};

export default SignUp;