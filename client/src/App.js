import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authActions';
import { clearCurrentProfile } from './actions/profileAction';

/** redux */
import {Provider} from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import './App.css';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';

import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';

// check for token
if(localStorage.jwtToken){
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // logout
  // check for expired token
  const currentTime = Date.now() / 1000;

  if(decoded.exp < currentTime){
    // Logout user
    store.dispatch(logoutUser());

    // todo: clear current profile

    store.dispatch(clearCurrentProfile());

    // redirect to login
    window.location.href = '/Login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container minHeight">
              <span>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />

                {/** dashboard는 인증이 된(로그인 한) 사람만 접근이 가능하게끔 */}
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>

                <Switch>
                  <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                </Switch>

                <Switch>
                  <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                </Switch>

                <Switch>
                  <PrivateRoute exact path="/add-credentials" component={AddExperience} />
                </Switch>

                <Switch>
                  <PrivateRoute exact path="/add-education" component={AddEducation} />
                </Switch>

              </span>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;