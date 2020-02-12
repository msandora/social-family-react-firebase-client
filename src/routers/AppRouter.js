import React from 'react';
// https://reacttraining.com/react-router/web/guides/quick-start
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';


import PrivateRoute from '../routers/PrivateRoute';
import PublicRoute from '../routers/PublicRoute';
// Pages
import Home from '../pages/Home';
import Recipes from '../pages/Recipes';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import User from '../pages/User';
import FamilyTree from '../pages/FamilyTree/FamilyTree.tsx';



export const history = createHistory();
const isMobile = window.innerWidth <= 500;

const AppRouter = () => (
  <Router history={history}>
    {(isMobile) ? 
    <Fragment>
      <div className="mobile-container">
        <Switch>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/signup" component={Signup} />
          <Route exact path="/family-tree" component={FamilyTree} />
          <Route exact path="/users/:handle" component={User} />
          <Route exact path="/users/:handle/scream/:screamId" component={User}/>
          <Route exact path="/recipes" component={Recipes} />
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
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/signup" component={Signup} />
          <Route exact path="/family-tree" component={FamilyTree} />
          <Route exact path="/users/:handle" component={User} />
          <Route exact path="/users/:handle/scream/:screamId" component={User}/>
          <Route exact path="/recipes" component={Recipes} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Fragment>
    }
  </Router>
);

export default AppRouter;