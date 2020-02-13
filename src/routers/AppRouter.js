import React, { Fragment } from 'react';
// https://reacttraining.com/react-router/web/guides/quick-start
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import PrivateRoute from '../routers/PrivateRoute';
import PublicRoute from '../routers/PublicRoute';
// Pages
import Home from '../pages/Home';
import Recipes from '../pages/Recipes';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import User from '../pages/User';
import FamilyTree from '../pages/FamilyTree/FamilyTree.tsx';
import NotFoundPage from '../pages/NotFoundPage';

import Navbar from '../components/layout/NavDesktop';
import Mobilebar from '../components/layout/NavMobile';
// Imports ^

export const history = createBrowserHistory ();
const isMobile = window.innerWidth <= 500;

const AppRouter = () => (
  <Router history={history}>
    {(isMobile) ? 
    <Fragment>
      <div className="mobile-container">
        <Switch>
          <Route exact path="/" component={Home} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/family-tree" component={FamilyTree} />
          <PrivateRoute exact path="/users/:handle" component={User} />
          <PrivateRoute exact path="/users/:handle/scream/:screamId" component={User}/>
          <PrivateRoute exact path="/recipes" component={Recipes} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
      <Mobilebar/>
    </Fragment>
    : 
    <Fragment>
      <Navbar/>
      <div className="desktop-container">
        <Switch>
          <Route exact path="/" component={Home} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/family-tree" component={FamilyTree} />
          <PrivateRoute exact path="/users/:handle" component={User} />
          <PrivateRoute exact path="/users/:handle/scream/:screamId" component={User}/>
          <PrivateRoute exact path="/recipes" component={Recipes} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Fragment>
    }
  </Router>
);

export default AppRouter;