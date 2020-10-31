import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import MainLayout from "./layouts/MainLayout";

import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";

const RouteWithLayout = ({ layout, component, ...rest }) => {
  return <Route {...rest} render={(props) => React.createElement(layout, props, React.createElement(component, props))} />;
};

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <RouteWithLayout layout={AppLayout} path="/" component={Signin} exact></RouteWithLayout>
        <RouteWithLayout layout={AppLayout} path="/signin" component={Signin}></RouteWithLayout>
        <RouteWithLayout layout={AppLayout} path="/signup" component={Signup}></RouteWithLayout>

        <RouteWithLayout layout={MainLayout} path="/dashboard" component={Dashboard}></RouteWithLayout>
      </Switch>
    </Router>
  );
}
