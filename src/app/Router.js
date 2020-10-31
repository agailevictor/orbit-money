import React from "react";
import { BrowserRouter as Router, Redirect, Switch, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import MainLayout from "./layouts/MainLayout";

import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";

const RouteWithLayout = ({ layout, component, ...rest }) => {
  return <Route {...rest} render={(props) => React.createElement(layout, props, React.createElement(component, props))} />;
};

const GuardedRoute = ({ auth, ...rest }) => {
  const isAuth = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : false;
  if (auth) {
    if (isAuth) {
      return <RouteWithLayout {...rest}></RouteWithLayout>;
    } else {
      return <Redirect to="/signin" />;
    }
  } else {
    return <RouteWithLayout {...rest}></RouteWithLayout>;
  }
};

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <GuardedRoute layout={AppLayout} path="/signin" component={Signin} auth={false}></GuardedRoute>
        <GuardedRoute layout={AppLayout} path="/signup" component={Signup} auth={false}></GuardedRoute>

        <GuardedRoute layout={MainLayout} path="/dashboard" component={Dashboard} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/" component={Dashboard} exact auth={true}></GuardedRoute>
      </Switch>
    </Router>
  );
}
