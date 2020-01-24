import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './util/App.css';
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
import Navbar from './components/layout/Navbar';
import Mobilebar from './components/layout/Mobilebar';

import themeObject from './util/theme';
import AuthRoute from './util/AuthRoute';
// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';
import FamilyTree from './pages/FamilyTree/FamilyTree.tsx';

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
    if (isMobile) {
      return (
        <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <div className="mobile-container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/signup" component={Signup} />
                <Route exact path="/family-tree" component={FamilyTree} />
                <Route exact path="/users/:handle" component={User} />
                <Route exact path="/users/:handle/scream/:screamId" component={User}/>
              </Switch>
            </div>
            <Mobilebar/>
          </Router>
        </Provider>
      </MuiThemeProvider>
      );
    } else {
      return (
        <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar/>
            <div className="desktop-container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/signup" component={Signup} />
                <Route exact path="/family-tree" component={FamilyTree} />
                <Route exact path="/users/:handle" component={User} />
                <Route exact path="/users/:handle/scream/:screamId" component={User}/>
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
      );
    }
  }
}
 
export default App;
