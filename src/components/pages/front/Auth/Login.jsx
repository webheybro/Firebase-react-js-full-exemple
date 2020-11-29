import { Button } from "@material-ui/core";
import { VpnKey } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import appFirebase from "../../../firebase/appFirebase";

import MyInputText from "../../../my/MyForm/MyInputText/MyInputText";
import { userState } from "../../../recoil/users/atoms";
import WrapperLoginRegister from "../../../wrappers/WrapperLoginRegister/WrapperLoginRegister";

function Login() {
  const [loading, setLoading] = React.useState(true);
  const [state, setState] = React.useState({
    email: "exemple@exemple.fr",
    password: "exemple",
  });
  const user = useRecoilValue(userState);

  const history = useHistory();
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    await appFirebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then((u) => {
        history.push("/securized");
      });
  };

  const onHandleChange = (e) => {
    const value = e.target.value;
    const nameChange = e.target.name;
    setState({ ...state, [nameChange]: value });
  };

  React.useEffect(() => {
    if (user.loggedIn) {
      history.push("/");
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.loggedIn]);

  if (loading) return null;

  return (
    <WrapperLoginRegister page="login">
      <div className="p-3 rounded">
        <h1 className="text-uppercase">Connexion</h1>
        <hr className="mb-2 bg-dark" />
        <form onSubmit={onHandleSubmit}>
          <MyInputText
            type="email"
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
            autoComplete="current-password"
          />
          <hr className="my-4" />
          <Button
            type="submit"
            fullWidth={true}
            className="w-100"
            color="secondary"
            variant="contained"
            startIcon={<VpnKey />}
          >
            Connexion
          </Button>
        </form>
      </div>
    </WrapperLoginRegister>
  );
}

export default Login;
