import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import LoadingPage from './containers/LoadingPage';
import BoardPage from './containers/BoardPage';
import LoginPage from './containers/LoginPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.BOARD} component={BoardPage} />
      <Route path={routes.LOGIN} component={LoginPage} />

      <Route path={routes.LOADING} component={LoadingPage} />
    </Switch>
  </App>
);
