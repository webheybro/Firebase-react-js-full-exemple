import { Button, IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import React from "react";
import { useRecoilState } from "recoil";
import appFirebase from "../../firebase/appFirebase";

import useAuth from "../../firebase/useAuth";
import MyInputText from "../../my/MyForm/MyInputText/MyInputText";
import {
  initTodosSelectors,
  allTodosSelectors,
} from "../../recoil/trucs/selectors";

const Dashboard = () => {
  useAuth();

  const db = appFirebase.firestore(); //Penser à changer les règles de lecture

  const [addTodo, setAddTodo] = React.useState();
  const [editTodo, setEditTodo] = React.useState();
  const [updateTodo, setUpdateTodo] = React.useState();

  const [initTodos, setInitTodos] = useRecoilState(initTodosSelectors);
  const [allTodos, setAllTodos] = useRecoilState(allTodosSelectors);

  /* -------- INIT RECOIL WITH FIREBASE -------- */
  React.useEffect(() => {
    if (!allTodos.length) setInitTodos(initTodos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ADD */
  const onHandleChange = (e) => {
    const value = e.target.value;
    setAddTodo(value);
  };

  /* UPDATE */
  const onHandleUpdateChange = (e) => {
    const value = e.target.value;
    setUpdateTodo(value);
  };

  /* FORM VISIBILITY */
  const onHandleEdit = (id) => {
    const one = allTodos.filter((item) => item.id === id);
    setEditTodo(id);
    setUpdateTodo(one[0].label);
  };
  const onHandleClear = () => {
    setEditTodo("");
    setUpdateTodo("");
  };

  /* -------- WITH FIREBASE -------- */

  /* ADD */
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = { label: addTodo };

    await db
      .collection("todos")
      .add(newTodo)
      .then((res) => {
        //AJOUT DE L'ID POUR MANIPS
        res.update({ id: res.id });
        newTodo.id = res.id;

        //On ajoute ensuite à la liste le nouvel élément
        const nouvelleListdeTrucs = [newTodo];
        const newRefs = [...nouvelleListdeTrucs, ...allTodos];
        setAllTodos(newRefs);
        setAddTodo("");
      });
  };

  /* UPDATE */
  const onHandleUpdate = async (e) => {
    e.preventDefault();

    const res = db.collection("todos").doc(editTodo);
    res.update({ label: updateTodo });

    //on récupe les infos du doc
    //mise à jour de la list
    //Juste pour l'exemple car inutile : newList = { id:editTodo, label: updateTodo }
    res.get().then(function (doc) {
      const newList = allTodos.map((item) => {
        if (item.id === editTodo) return doc.data();
        return item;
      });
      setAllTodos(newList);
      setUpdateTodo("");
      setEditTodo("");
    });
  };

  /* DELETE */
  const onHandleDelete = async (id) => {
    await db
      .collection("todos")
      .doc(id)
      .delete()
      .then(() => {
        const list = [...allTodos];
        const newList = list.filter((v) => v.id !== id);
        setAllTodos(newList);
      });
  };

  return (
    <div className="container mt-5 text-center text-xxxl uppercase">
      <FormTodo
        onSubmit={onHandleUpdate}
        onChange={(e) => onHandleUpdateChange(e)}
        value={updateTodo}
        onClear={onHandleClear}
        btn="Modifier"
        visible={editTodo ? true : false}
      />
      <FormTodo
        onSubmit={onHandleSubmit}
        onChange={onHandleChange}
        value={addTodo}
        visible={editTodo ? false : true}
      />

      <ListTodos
        list={allTodos}
        onEdit={onHandleEdit}
        onDelete={onHandleDelete}
      />
    </div>
  );
};

export default Dashboard;

const FormTodo = ({
  onSubmit,
  onChange,
  value,
  btn = "Ajouter",
  onClear = "",
  id,
  visible,
}) => (
  <div className={!visible ? "d-none" : ""}>
    <form onSubmit={onSubmit}>
      <div className="d-flex w-100">
        <div className="w-100 mr-3">
          <MyInputText
            type="text"
            name={id}
            placeholder="Ecris un truc"
            onChange={onChange}
            value={value}
            autoComplete="nope"
            size="lg"
          />
        </div>
        <div className="ml-auto d-flex">
          <Button
            variant="contained"
            color="secondary"
            className="bold"
            type="submit"
            size="small"
          >
            {btn}
          </Button>
          {onClear && (
            <Button
              onClick={() => onClear()}
              className="ml-3 bold"
              variant="contained"
              color="primary"
              size="small"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
    </form>
  </div>
);

const ListTodos = ({ list, onDelete, onEdit }) => {
  return list.map((item) => (
    <div key={item.id}>
      <div className="d-flex justify-content-center align-items-center mt-3">
        <div className="text-l">{item.label}</div>
        <div className="ml-auto">
          <IconButton onClick={() => onEdit(item.id)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => onDelete(item.id)}>
            <Delete />
          </IconButton>
        </div>
      </div>
      <hr />
    </div>
  ));
};
