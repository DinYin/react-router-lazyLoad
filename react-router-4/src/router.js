import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import PageTwo from './routes/PageTwo';

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history }) {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route path="/" exact component={IndexPage} />
          <Route path="/pageTwo" exact component={PageTwo} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default RouterConfig;
