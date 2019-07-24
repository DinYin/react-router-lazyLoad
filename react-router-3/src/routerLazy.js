import React from 'react';
import { Router, Route } from 'dva/router';
// import IndexPage from './routes/IndexPage';
// import PageTwo from './routes/PageTwo'; 

const IndexPage = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./routes/IndexPage'))
    },'IndexPage')
}
const PageTwo = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./routes/PageTwo'))
    },'PageTwo')
}
//配置route, getComponent es6写法需要加default
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" getComponent={IndexPage}/>
      <Route path="/pageTwo" getComponent={PageTwo} />
    </Router>
  );
}

export default RouterConfig;
