import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from "react-router";

import BaseLayout from "./components/layouts/Base";
import DashboardLayout from "./components/layouts/Dashboard";
import injectTapEventPlugin from 'react-tap-event-plugin';
import DashboardOverviewPage from "./components/pages/Dashboard/Overview";
import LoginPage from "./components/pages/Login";
import EmailSender from './components/pages/EmailSender';
import { store, history } from './create_store';
import { check } from './services/sessions';

// generated components paths
import Activities from './components/activities';
import Activity from './components/activities/show';
import ActivityForm from './components/activities/form';
import Athlets from './components/pages/athlets/index';
import AthletForm from './components/pages/athlets/form';
import Admins from './components/pages/admins/index';
import AdminForm from './components/pages/admins/form';


window.onload = function () {
  injectTapEventPlugin();
  ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route name="base" path="/" component={BaseLayout}>
        <Route name="dashboard" path='' component={DashboardLayout} onEnter={check}>
          <IndexRoute name="dashboard.overview" component={DashboardOverviewPage} />
          <Route name='email_sender' path='email_sender' component={EmailSender} />
          {/*generated routes:*/}
          <Route name='activities' path='activities' component={Activities} />
          <Route name='new_activity' path='activity/new' component={ActivityForm} />
          <Route name='edit_activity' path='activity/:id/edit' component={ActivityForm} />
          <Route name='show_activity' path='activity/:id' component={Activity} />
          <Route name='athlets' path='athlets' component={Athlets} />
          <Route name='new_athlet' path='athlet/new' component={AthletForm} />
          <Route name='edit_athlet' path='athlet/:id/edit' component={AthletForm} />
          <Route name='admins' path='admins' component={Admins} />
          <Route name='new_admin' path='admin/new' component={AdminForm} />
          <Route name='edit_admin' path='admin/:id/edit' component={AdminForm} />
        </Route>
        <Route name="login" path='login' component={LoginPage} />
      </Route>
      <Route path="*" component={LoginPage} />
    </Router>
  </Provider>,
  document.getElementById('content')
  );

};
