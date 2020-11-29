import { selector } from "recoil";
import appFirebase from "../../firebase/appFirebase";
import { userState } from "./atoms";

//non utilisé
export const currentUserSelector = selector({
  key: "currentUserSelector",
  get: ({ get }) => {
    return get(userState);
  },
});

export const isLoggedSelector = selector({
  key: "isLoggedSelector",
  get: ({ get }) => {
    const { loggedIn } = get(userState);
    return loggedIn;
  },
});

export const logOutSelector = selector({
  key: "logOutSelector",
  set: () => {
    appFirebase.auth().signOut();
  },
});
