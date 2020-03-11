import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './util/App.css';
// import '../node_modules/font-awesome/css/font-awesome.min.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode'; // decodes temporary token for user that is logged in
import axios from 'axios';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
// Components
import NavDesktop from './components/layout/NavDesktop';
import NavMobile from './components/layout/NavMobile';
// Utilies
import themeObject from './util/theme';
import AuthRoute from './util/AuthRoute';
// Pages
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';
import FamilyTree from './pages/FamilyTree/FamilyTree.tsx';
import Memories from './pages/Memories';
import NotFoundPage from './pages/NotFoundPage';

const theme = createMuiTheme(themeObject);

axios.defaults.baseURL =
  'https://us-central1-socialfamily-d58c8.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() { 
    const isMobile = window.innerWidth <= 500;
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
          {(isMobile) ? 
            <Fragment>
              <NavMobile/>
              <div className="mobile-container">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <AuthRoute exact path="/login" component={Login} />
                  <AuthRoute exact path="/signup" component={Signup} />
                  <Route exact path="/family-tree" component={FamilyTree} />
                  <Route exact path="/users/:handle" component={User} />
                  <Route exact path="/users/:handle/scream/:screamId" component={User}/>
                  <Route exact path="/recipes" component={Recipes} />
                  <Route exact path="/users/:handle/recipe/:screamId" component={User}/>
                  <Route exact path="/gallery" component={Memories} />
                  <Route component={NotFoundPage} />
                </Switch>
              </div>
            </Fragment>
          : 
            <Fragment>
              <NavDesktop/>
              <div className="desktop-container">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <AuthRoute exact path="/login" component={Login} />
                  <AuthRoute exact path="/signup" component={Signup} />
                  <Route exact path="/family-tree" component={FamilyTree} />
                  <Route exact path="/users/:handle" component={User} />
                  <Route exact path="/users/:handle/scream/:screamId" component={User}/>
                  <Route exact path="/recipes" component={Recipes} />
                  <Route exact path="/users/:handle/recipe/:screamId" component={User}/>
                  <Route exact path="/gallery" component={Memories} />
                  <Route component={NotFoundPage} />
                </Switch>
              </div>
            </Fragment>
          }
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}
 
export default App;
