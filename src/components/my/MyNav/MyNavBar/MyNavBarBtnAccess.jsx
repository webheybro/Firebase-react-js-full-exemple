import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  isLoggedSelector,
  logOutSelector,
} from "../../../recoil/users/selectors";

const MyNavBarBtnAccess = () => {
  const btnClasses = " mr-2  text-white bold";
  const minsize = useMediaQuery("(max-width:600px)");
  const size = minsize ? "small" : "medium";

  const isLogged = useRecoilValue(isLoggedSelector);
  const logOut = useSetRecoilState(logOutSelector);
  const history = useHistory();

  const onHandleLogOut = () => {
    logOut();
    history.push("/");
  };

  return (
    <div
      className={`d-flex content-justify-right justify-content-end mr-3 ml-auto mt-3 pt-1 text-l ${
        minsize && "pt-2"
      }`}
    >
      {isLogged ? (
        <>
          <Link to="/securized">
            <Button className={btnClasses} size={size}>
              Espace sécurisé
            </Button>
          </Link>
          <Button
            className={btnClasses}
            size={size}
            onClick={() => onHandleLogOut()}
          >
            Déconnexion
          </Button>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button className={btnClasses} size={size}>
              Connexion
            </Button>
          </Link>
          <Link to="/register">
            <Button className={btnClasses} size={size}>
              Inscription
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default MyNavBarBtnAccess;
