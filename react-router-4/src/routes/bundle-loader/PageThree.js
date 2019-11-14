import React from 'react';
import { connect } from 'dva';
import styles from './PageThree.css';

function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>组件3: bundle-loader</h1>
    </div>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
