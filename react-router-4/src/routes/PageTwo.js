import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from './IndexPage.css';
import Line from './Line';
import Three from'./bundle-loader/ThreeContainer';
import Four from'./react-loadable';

class IndexPage extends React.Component {
  state={
    isAsync:false
  }
  render(){
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <Line />
      <ul className={styles.list}>
        <li>
          To get started, edit <code>src/index.js</code> and save to reload.
        </li>
        <li>
          <Link to="/">
            pageTwo
          </Link>
        </li>
        <li>
        <button onClick={()=>{this.setState({isAsync: !this.state.isAsync})}}>{this.state.isAsync ?'点击 隐藏' : '点击 异步加载'}</button>
        {/** bundle-loader*/}
        {this.state.isAsync && <Three />}
        {/** react-loadable*/}
        {this.state.isAsync && <Four />}
        </li>
      </ul>
    </div>
  );
  }
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
