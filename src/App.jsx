import React from "react";
import { Route, Switch } from "react-router-dom";

import { useRecoilState } from "recoil";
import { userState } from "./components/recoil/users/atoms";

import appFirebase from "./components/firebase/appFirebase";
import useAuthObservable from "./components/firebase/useAuthObservable";

import AppWrapper from "./components/wrappers/AppWrapper/AppWrapper";

import NoFound from "./components/pages/NoFound";
import Home from "./components/pages/front/Home";
import Login from "./components/pages/front/Auth/Login";
import Register from "./components/pages/front/Auth/Register";
import Dashboard from "./components/pages/backoffice/Dashboard";

function App() {
  const [user, setUser] = useRecoilState(userState);

  //gère le statut Loggedin
  useAuthObservable();

  /*
  Si connecté on récupère les infos 
  */
  React.useEffect(() => {
    if (user.loggedIn) {
      const newUser = appFirebase.auth().currentUser;
      if (newUser) {
        const newdata = {
          name: newUser.displayName,
          email: newUser.email,
          photoUrl: newUser.photoURL,
          emailVerified: newUser.emailVerified,
          uid: newUser.uid,
        };
        setUser({
          ...user,
          data: newdata,
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.loggedIn]);

  return (
    <AppWrapper>
      <Switch>
        {user.loggedIn && (
          <>
            <Route path="/securized" exact>
              <Dashboard />
            </Route>
          </>
        )}

        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>

        <Route path="/404" component={NoFound} />
        <Route component={NoFound} />
      </Switch>
    </AppWrapper>
  );
}

export default App;

/*
 
*/
