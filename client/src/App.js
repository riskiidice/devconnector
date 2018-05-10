import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthenToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './App.css';

// Check for token
if(localStorage.jwtToken){
  // Set auth header auth
  setAuthenToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticate
  store.dispatch(setCurrentUser(decoded));
  // Check for expire
  const currentTime = Date.now()/1000;
  if(decoded.exp < currentTime){
      store.dispatch(logoutUser());
      window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store} > 
      <Router>
        <div className="App">
          <Navbar/>
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </div>
          <Footer/>
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
