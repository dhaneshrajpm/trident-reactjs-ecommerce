import React from 'react';

import styles from './Contact.module.scss';

const Contact = () => {
  return (
    <div className={styles.container} >
      <h2 className={styles.name}>Hi, I'm Dhanesh</h2>
      <span>A web Developer</span>
      <span>Contact: dhaneshraj2311@gmail.com</span>
      <span>LinkedIn: <a href='https://www.linkedin.com/in/dhaneshrajpm' target='#' rel="noreferrer">Dhanesh Raj P M</a></span>
    </div>
  );
}

export default Contact;