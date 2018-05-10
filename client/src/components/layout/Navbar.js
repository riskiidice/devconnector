import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import {logoutUser} from '../../actions/authActions'

class Navbar extends Component {

  onLogoutClick(e){
    console.log('eiei');
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (  
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a 
            href="#" 
            onClick={this.onLogoutClick.bind(this)}
             className="nav-link">
          <img 
              className="rounded-circle"
              src={user.avatar} 
              alt={user.name} 
              title="You must have a Gravatar Connected to your email to display image" 
              style={{ width: '25px',marginRight: '5px'}} />
          Logout
          </a>
        </li>
      </ul>
    );
  const guestLinks = (
    <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login"> 
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register"> 
                  Signup
                </Link>
              </li>
            </ul>
  );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">DevConnector</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>
    
          <div className="collapse navbar-collapse" id="mobile-nav">
            { isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    )
  }
}
Navbar.PropTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps,{logoutUser})(Navbar);