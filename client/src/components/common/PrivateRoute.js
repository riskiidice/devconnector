import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropsTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

PrivateRoute.PropsTypes = {
  auth: PropsTypes.object.isRequired
};

export default connect(mapStateToProps)(PrivateRoute);
