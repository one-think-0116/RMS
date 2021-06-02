import React, { useState, useEffect} from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
  AttachMoney as AttachMoneyIcon,
  PlaylistAdd as PlaylistAddIcon,
  LibraryBooks as LibraryBooksIcon,
  People as PeopleIcon,
  MenuBook as MenuBookIcon,
} from "@material-ui/icons";
import ReceiptIcon from '@material-ui/icons/Receipt';
import TextsmsIcon from '@material-ui/icons/Textsms';
import BusinessIcon from '@material-ui/icons/Business';
import TollIcon from '@material-ui/icons/Toll';
import BatteryCharging80Icon from '@material-ui/icons/BatteryCharging80';
import LocalAtmSharpIcon from '@material-ui/icons/LocalAtmSharp';
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

import jwt_decode from "jwt-decode";

//firebase


const admin_structure = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  { id: 1, label: "Calculator", link: "/app/calculator", icon: <AttachMoneyIcon /> },
  { id: 2, label: "Adders", link: "/app/adders", icon: <PlaylistAddIcon /> },
  { id: 3, type: "divider" },
  // { id: 9, label: "Message", link: "/app/message", icon: <TextsmsIcon /> },
  { id: 10, label: "Selfgen Lead", link: "/app/selfgen_lead", icon: <BusinessIcon /> },
  { id: 11, label: "Module", link: "/app/module", icon: <TollIcon /> },
  { id: 12, label: "Battery Type", link: "/app/battery_type", icon: <BatteryCharging80Icon /> },
  { id: 8, label: "Cash", link: "/app/cash", icon: <LocalAtmSharpIcon /> },
  { id: 7, label: "Dealer Fee", link: "/app/fee", icon: <ReceiptIcon /> },
  { id: 4, label: "Formulas", link: "/app/formulas", icon: <LibraryBooksIcon /> },
  { id: 5, label: "Users", link: "/app/users", icon: <PeopleIcon /> },
  { id: 6, label: "Guide", link: "/app/guide", icon: <MenuBookIcon /> },
];
const seller_structure = [
  { id: 0, label: "Calculator", link: "/app/calculator", icon: <AttachMoneyIcon /> },
  { id: 1, label: "Adders", link: "/app/adders", icon: <PlaylistAddIcon /> },
  // { id: 2, label: "Message", link: "/app/message", icon: <TextsmsIcon /> },
];
  

function Sidebar({ location }) {
  //
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);
  const [structure,setStructure] = useState(seller_structure);
  useEffect(function() {
    if(localStorage.getItem('token')){
      const decoded = jwt_decode(localStorage.getItem('token'))
      // console.log(decoded);
      decoded.role === "admin"? setStructure(admin_structure) : setStructure(seller_structure);
    }else{
      setStructure(seller_structure)
    }
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });
      return (
        <Drawer
          variant={isPermanent ? "permanent" : "temporary"}
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: isSidebarOpened,
            [classes.drawerClose]: !isSidebarOpened,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: isSidebarOpened,
              [classes.drawerClose]: !isSidebarOpened,
            }),
          }}
          open={isSidebarOpened}
        >
          <div className={classes.toolbar} />
          <div className={classes.mobileBackButton}>
            <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
              <ArrowBackIcon
                classes={{
                  root: classNames(classes.headerIcon, classes.headerIconCollapse),
                }}
              />
            </IconButton>
          </div>
          <List className={classes.sidebarList}>
            {structure.map(link => (
              <SidebarLink
                key={link.id}
                location={location}
                isSidebarOpened={isSidebarOpened}
                {...link}
              />
            ))}
          </List>
        </Drawer>
      );

    // })
  // })
      // return null;
      // ##################################################################
      function handleWindowWidthChange() {
        var windowWidth = window.innerWidth;
        var breakpointWidth = theme.breakpoints.values.md;
        var isSmallScreen = windowWidth < breakpointWidth;
    
        if (isSmallScreen && isPermanent) {
          setPermanent(false);
        } else if (!isSmallScreen && !isPermanent) {
          setPermanent(true);
        }
      }
  
}

export default withRouter(Sidebar);
