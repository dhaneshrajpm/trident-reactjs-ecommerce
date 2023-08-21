import React from 'react';

import styles from './Contact.module.scss';

const Contact = () => {
  return (
    <div className={styles.container} >
      <h1>Hi, I am Dhanesh Raj P M</h1>
      <p>A web Developer</p>
      <span>Contact: dhaneshraj2311@gmail.com</span>
      <span>LinkedIn: <a href='https://www.linkedin.com/in/dhaneshrajpm' target='#' rel="noreferrer">Dhanesh Raj P M</a></span>
    </div>
  );
}

export default Contact;