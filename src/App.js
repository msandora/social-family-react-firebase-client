import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeObject from './util/theme';
import jwtDecode from 'jwt-decode'; // decodes temporary token for user that is logged in

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FamilyTree from './pages/FamilyTree/FamilyTree.tsx';



const theme = createMuiTheme(themeObject);

let authenticated;
const token = localStorage.FBIdToken;
if(token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  // compare decode token expiration with present time
  if(decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login'
    authenticated = false;
  } else {
    authenticated = true;
  }
  console.log(authenticated);
}

class App extends Component {
  state = {  }
  render() { 
    return ( 
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar/>
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/login" component={Login} authenticated={authenticated}/>
                <AuthRoute exact path="/signup" component={Signup} authenticated={authenticated}/>
                <AuthRoute exact path="/family-tree" component={FamilyTree} authenticated={authenticated}/>
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}
 
export default App;

