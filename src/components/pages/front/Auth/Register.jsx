import React from "react";

import { Button } from "@material-ui/core";
import { CardMembership } from "@material-ui/icons";

import WrapperLoginRegister from "../../../wrappers/WrapperLoginRegister/WrapperLoginRegister";

import MyInputText from "../../../my/MyForm/MyInputText/MyInputText";
import appFirebase from "../../../firebase/appFirebase";
import { useHistory } from "react-router-dom";

const Register = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const history = useHistory();

  const onHandleSubmit = (e) => {
    e.preventDefault();
    appFirebase
      .auth()
      .createUserWithEmailAndPassword(state.email, state.password)
      .then(() => {
        var newUser = appFirebase.auth().currentUser;
        newUser.updateProfile({
          displayName: state.username,
        });

        history.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ..
      });
  };
  const onHandleChange = (e) => {
    const value = e.target.value;
    const nameChange = e.target.name;
    setState({ ...state, [nameChange]: value });
  };
  return (
    <WrapperLoginRegister page="register">
      <div className="p-3 rounded">
        <h1 className="text-uppercase">Inscription : {state.username}</h1>
        <hr className="mb-0 bg-dark" />
        <small className="">*Tous les champs sont obligatoires</small>
        <form onSubmit={onHandleSubmit}>
          <MyInputText
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => onHandleChange(e)}
            value={state.username}
            label="Pseudo / Nom d'utilisateur"
            autoComplete="off"
          />
          <MyInputText
            type="text"
            name="email"
            placeholder="Email"
            onChange={onHandleChange}
            value={state.email}
            label="Email"
            autoComplete="nope"
          />

          <MyInputText
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={onHandleChange}
            value={state.password}
            label="Mot de passe"
            autoComplete="new-password"
          />
          <hr className="my-4" />
          <div className="mt-4">
            <Button
              type="submit"
              disabled={
                !state.email || !state.username || !state.password
                  ? true
                  : false
              }
              color="primary"
              className="w-100"
              startIcon={<CardMembership />}
            >
              Inscription
            </Button>
          </div>
        </form>
      </div>
    </WrapperLoginRegister>
  );
};

export default Register;
