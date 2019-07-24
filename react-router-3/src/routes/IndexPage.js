import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import styles from './IndexPage.css';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>
          react-router-3
        </li>
        <li>
          <Link to="pageTwo">
           pageIndex
          </Link>
        </li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
