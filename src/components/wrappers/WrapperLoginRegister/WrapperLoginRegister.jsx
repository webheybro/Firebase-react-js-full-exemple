import { makeStyles, useMediaQuery } from "@material-ui/core";
import React from "react";

const useStyle = makeStyles({
  main: {
    marginTop: "-80px",
  },
  leftside: {
    paddingTop: "80px",
    height: "100vh",
    opacity: "1",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  leftsideMobile: {
    width: "0",
  },
  leftsideScreen: {
    width: "40%",
  },

  rightside: {
    paddingTop: "80px",
  },
  rightsideMobile: {
    width: "100%",
  },
  rightsideScreen: {
    width: "60%",
  },
  form: {
    width: "450px",
  },
  login: {
    backgroundImage: "url(img/bg_login2.jpg)",
    backgroundPosition: "top 50px center",
  },
  register: {
    backgroundImage: "url(img/bg_register.jpg)",
    backgroundPosition: "top 0px center",
  },
});

const WrapperLoginRegister = ({ page = "login", children }) => {
  const classes = useStyle();
  const mediaQuery960max = useMediaQuery("(max-width:960px)");

  const leftSideDisplay = mediaQuery960max
    ? classes.leftsideMobile
    : classes.leftsideScreen;

  const rightSideDisplay = mediaQuery960max
    ? classes.rightsideMobile
    : classes.rightsideScreen;

  const rightsideClasses = `d-flex justify-content-center align-items-center ${classes.rightside} ${rightSideDisplay}`;

  return (
    <div className={`d-flex ${classes.main}`}>
      <div
        className={`${classes.leftside} ${classes[page]} ${leftSideDisplay}`}
      ></div>
      <div className={rightsideClasses}>
        <div className={classes.form}>{children}</div>
      </div>
    </div>
  );
};

export default WrapperLoginRegister;
