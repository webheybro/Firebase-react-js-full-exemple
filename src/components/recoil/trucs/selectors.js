import { selector } from "recoil";
import appFirebase from "../../firebase/appFirebase";
import { todoState } from "./atoms";

const db = appFirebase.firestore();

export const initTodosSelectors = selector({
  key: "initTodosSelectors",
  get: async () => {
    //GET LIST
    const data = await db.collection("todos").get();
    const newArray = [];
    data.docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      return newArray.push({ id, ...data });
    });

    return newArray;
  },
  set: async ({ set }, newArray) => {
    set(todoState, (todoState) => ({
      ...todoState,
      data: newArray,
      init: true,
    }));
  },
});

export const allTodosSelectors = selector({
  key: "allTodosSelectors",
  get: async ({ get }) => {
    const list = get(todoState).data;
    return list;
  },
  set: ({ set }, newArray) => {
    set(todoState, (todoState) => ({
      ...todoState,
      data: newArray,
    }));
  },
});
