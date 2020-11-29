import React from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/users/atoms";
import appFirebase from "./appFirebase";

/*
Check Loggedin AND Firebase Loggedin
*/

const useAuth = () => {
  const user = useRecoilValue(userState);
  const history = useHistory();
  React.useEffect(() => {
    if (!user.loggedIn) {
      const user = appFirebase.auth().currentUser;
      if (!user) history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useAuth;
