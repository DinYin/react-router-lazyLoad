import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import OneContainer from './routes/oneContainer';
import TwoContainer from './routes/twoContainer';

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history }) {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route path="/" exact component={OneContainer} />
          <Route path="/pageTwo" component={TwoContainer} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default RouterConfig;
