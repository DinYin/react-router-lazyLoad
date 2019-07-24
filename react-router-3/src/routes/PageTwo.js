import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from './IndexPage.css';
import Line from './Line';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <Line />
      <ul className={styles.list}>
        <li>
         页面2
        </li>
        <li>
          <Link to="/">
            pageTwo
          </Link>
        </li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
