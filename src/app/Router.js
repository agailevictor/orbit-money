import React from "react";
import { BrowserRouter as Router, Redirect, Switch, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import MainLayout from "./layouts/MainLayout";

import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Settings from "./pages/Settings/Settings";
import PersonalAccount from "./pages/PersonalAccount/PersonalAccount";
import RecipientsList from "./pages/Recipients/RecipientsList";
import BusinessAccount from "./pages/BusinessAccount/BusinessAccount";
import EmailSetting from "./pages/EmailSetting/EmailSetting";
import NotificationSettings from "./pages/NotificationSettings/NotificationSettings";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import DeleteMyAccount from "./pages/DeleteMyAccount/DeleteMyAccount";
import Verify from "./pages/Verify/Verify";
import CreateBusinessAccount from "./pages/CreateBusinessAccount/CreateBusinessAccount";
import CustomerDashboard from "./pages/CustomerDashboard/CustomerDashboard";
import SendMoney from "./pages/SendMoney/SendMoney";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import VerifyForgotPassword from "./pages/VerifyForgotPassword/VerifyForgotPassword";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword";
import Notifications from "./pages/Notifications/Notifications"
import Reports from "./pages/Reports/Reports"
import AddMoney from "./pages/AddMoney/AddMoney"
import ETransfer from "./pages/AddMoney/ETransfer"
import WirePayment from "./pages/AddMoney/WirePayment"
import DirectDebit from "./pages/AddMoney/DirectDebit"

const RouteWithLayout = ({ layout, component, ...rest }) => {
  return <Route {...rest} render={(props) => {
    if (rest.full)
      props.full = true;
    return React.createElement(layout, props, React.createElement(component, props));
  }} />;
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
        <GuardedRoute layout={AppLayout} path="/forgot-password" component={ForgotPassword} auth={false}></GuardedRoute>
        <GuardedRoute layout={AppLayout} path="/verify" component={Verify} auth={false}></GuardedRoute>
        <GuardedRoute layout={AppLayout} path="/passwordReset" component={VerifyForgotPassword} auth={false}></GuardedRoute>
        <GuardedRoute layout={AppLayout} path="/update-password" component={UpdatePassword} auth={false}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/dashboard" component={Dashboard} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/recipients" component={RecipientsList} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/settings" component={Settings} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/personal-account" component={PersonalAccount} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/business-account" component={BusinessAccount} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/email-setting" component={EmailSetting} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/notification-settings" component={NotificationSettings} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/change-password" component={ChangePassword} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/delete-my-account" component={DeleteMyAccount} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/create-business-account" component={CreateBusinessAccount} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/customer-dashboard" component={CustomerDashboard} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/send-money" component={SendMoney} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/" component={Dashboard} exact auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/reports" component={Reports} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} full={true} path="/add-money" component={AddMoney} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} full={true} path="/add-e-transfer" component={ETransfer} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} full={true} path="/add-direct-debit" component={DirectDebit} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} full={true} path="/add-wire-payment" component={WirePayment} auth={true}></GuardedRoute>
        <GuardedRoute layout={MainLayout} path="/notifications" component={Notifications} auth={true}></GuardedRoute>
      </Switch>
    </Router>
  );
}
