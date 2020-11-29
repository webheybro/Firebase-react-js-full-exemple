import React from "react";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/users/atoms";
import appFirebase from "./appFirebase";

/*
Check Auth Stat
*/
const useAuthObservable = () => {
  const [userSt, setUser] = useRecoilState(userState);

  React.useEffect(() => {
    appFirebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUser({
          ...userSt,
          loggedIn: true,
        });
      } else {
        setUser({ ...userSt, loggedIn: false });
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useAuthObservable;
/* 
    appFirebase
      .auth()
      .onAuthStateChanged()
      .then((u) => {
        if (u) {
          setUser({ ...user, loggedIn: true, data: u });
        } else {
          setUser({ ...user, loggedIn: false, data: {} });
        }
      })
      .catch((err) => {
        console.log(err);
      }); */
