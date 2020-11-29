import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import MyNavBarBtnAccess from "./MyNavBarBtnAccess";

/************************************/
// STYLE
/************************************/
const useStyleMyNavBar = makeStyles(() => ({
  topbar: {
    position: "relative",
    zIndex: "500",
    top: " 0px",
    width: "100%",
    height: "80px",
    backgroundColor: "black",

    "&.logo-no-margin-left .logo": {
      paddingLeft: "20px",
    },
    topbarbtn: {
      position: "relative",
    },
  },
  logo: {
    position: "relative",
    fontSize: "28px",
    textAlign: "left",
    paddingLeft: "70px",
    paddingRight: "10px",
    top: "17px",
    "& a": {
      color: "#FFFFFF",
      "&:hover": {
        textDecoration: "none",
      },
    },
  },
  topBarBtnMobile: {
    button: {
      marginTop: "5px",
      padding: "2px 4px !important",
      fontSize: "15px",
    },
  },
}));

/************************************/
// PRINCIPAL FUNCTION
/************************************/
const MyNavBar = () => {
  const classes = useStyleMyNavBar();

  const loggedClasses = {
    header: "pl-3",
  };

  return (
    <header className={`d-flex justify-content-between ${classes.topbar} `}>
      <div className={`${classes.logo} ${loggedClasses.header}`}>
        <Link to="/" className="font-poppins text-xxl">
          {process.env.REACT_APP_TITLE}
        </Link>
      </div>
      <div className={`position-relative ${loggedClasses.topBarBtn}`}>
        <MyNavBarBtnAccess />
      </div>
    </header>
  );
};
export default MyNavBar;
