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
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
import Calculator from "../../pages/calculator";
import Adder from "../../pages/adders";
import Formulas from "../../pages/formulas";
import Users from "../../pages/users";
import Guide from "../../pages/guide";
import Fee from "../../pages/fee";
import Cash from "../../pages/cash";


// context
import { useLayoutState } from "../../context/LayoutContext";
//jwt
import jwt_decode from "jwt-decode";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();
  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/calculator" component={Calculator} />
              <Route path="/app/adders" component={Adder} />
              {/* <Route path="/app/typography" component={Typography} /> */}
              {/* <Route path="/app/tables" component={Tables} /> */}
              {/* <Route path="/app/notifications" component={Notifications} /> */}
              <PrivateRoute path="/app/dashboard" component={Dashboard} />
              <PrivateRoute path="/app/formulas" component={Formulas} />
              <PrivateRoute path="/app/users" component={Users} />
              <PrivateRoute path="/app/guide" component={Guide} />
              <PrivateRoute path="/app/fee" component={Fee} />
              <PrivateRoute path="/app/cash" component={Cash} />
              {/* <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/ui/maps" component={Maps} />
              <Route path="/app/ui/icons" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} /> */}
            </Switch>
            
          </div>
        </>
    </div>
  );
}
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => 
    {
      var decoded;
      if(localStorage.getItem('token')){
        decoded = jwt_decode(localStorage.getItem('token'))
      }
      return (
        decoded.role === "admin"
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/app/calculator',
              state: { from: props.location }
            }} />
      )
    }} />
)

export default withRouter(Layout);
