import React from "react";
import { BrowserRouter as Router, Redirect, Switch, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import MainLayout from "./layouts/MainLayout";

import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Settings from "./pages/Settings/Settings";
import PersonalAccount from "./pages/PersonalAccount/PersonalAccount";
import BusinessAccount from "./pages/BusinessAccount/BusinessAccount";
import EmailSetting from "./pages/EmailSetting/EmailSetting";
import NotificationSettings from "./pages/NotificationSettings/NotificationSettings";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import DeleteMyAccount from "./pages/DeleteMyAccount/DeleteMyAccount";
import Verify from "./pages/Verify/Verify";

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
        <GuardedRoute layout={AppLayout} path="/verify" component={Verify} auth={false}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/dashboard" component={Dashboard} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/settings" component={Settings} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/personal-account" component={PersonalAccount} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/business-account" component={BusinessAccount} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/email-setting" component={EmailSetting} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/notification-settings" component={NotificationSettings} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/change-password" component={ChangePassword} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/delete-my-account" component={DeleteMyAccount} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/" component={Dashboard} exact auth={true}></GuardedRoute>
      </Switch>
    </Router>
  );
}
