import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import PageTwo from './routes/PageTwo';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/pageTwo" component={PageTwo} />
    </Router>
  );
}

export default RouterConfig;
