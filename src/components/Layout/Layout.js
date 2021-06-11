import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
// import Dashboard from "../../pages/dashboard";
import Calculator from "../../pages/calculator";
import Adder from "../../pages/adders";
import Formulas from "../../pages/formulas";
import Users from "../../pages/users";
import Guide from "../../pages/guide";
import Fee from "../../pages/fee";
import Cash from "../../pages/cash";
import Battery from "../../pages/battery";
import Selfgen from "../../pages/selfgen";
import Module from "../../pages/module";

import { useSelector, useDispatch } from "react-redux";
import { FirebaseContext } from '../../redux';
function Layout(props) {

  const auth = useSelector(state => state.auth);
  const layout = useSelector(state => state.layout);
  var classes = useStyles();
  // global
  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layout.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
              <Switch>
                <Route path="/app/calculator" component={Calculator} />
                <Route path="/app/adders" component={Adder} />
                {/* <PrivateRoute path="/app/dashboard" role={auth.info?auth.info.profile.role:null} component={Dashboard} /> */}
                <PrivateRoute path="/app/formulas" role={auth.info?auth.info.profile.role:null} component={Formulas} />
                <PrivateRoute path="/app/users" role={auth.info?auth.info.profile.role:null} component={Users} />
                <PrivateRoute path="/app/guide" role={auth.info?auth.info.profile.role:null} component={Guide} />
                <PrivateRoute path="/app/fee" role={auth.info?auth.info.profile.role:null} component={Fee} />
                <PrivateRoute path="/app/cash" role={auth.info?auth.info.profile.role:null} component={Cash} />
                <PrivateRoute path="/app/battery_type" role={auth.info?auth.info.profile.role:null} component={Battery} />
                <PrivateRoute path="/app/selfgen_lead" role={auth.info?auth.info.profile.role:null} component={Selfgen} />
                <PrivateRoute path="/app/module" role={auth.info?auth.info.profile.role:null} component={Module} />
              </Switch>
            </div>
        </>
    </div>
  );
}
const PrivateRoute = ({ component: Component,role:role, ...rest }) => (
  <Route {...rest} render={(props) => 
    {
      return (
        role === "admin"
          ? <Component {...props} />
          : 
          <Redirect to={{
              pathname: '/app/calculator',
              state: { from: props.location }
            }} />
      )
    }} />
)

export default withRouter(Layout);
