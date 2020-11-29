import { Button, IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import React from "react";
import appFirebase from "../../firebase/appFirebase";

import useAuth from "../../firebase/useAuth";
import MyInputText from "../../my/MyForm/MyInputText/MyInputText";

const Dashboard = () => {
  useAuth();

  const db = appFirebase.firestore(); //Penser à changer les règles de lecture

  const [tousLesTrucs, setTousLesTrucs] = React.useState([]);

  const [addState, setAddState] = React.useState();
  const [editState, setEditState] = React.useState();
  const [updateState, setUpdateState] = React.useState();

  /* LIST */
  React.useEffect(() => {
    if (!tousLesTrucs.length) {
      const fetchData = async () => {
        const data = await db.collection("destrucs").get();
        const nouvelleListdeTrucs = [];
        data.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return nouvelleListdeTrucs.push({ id, ...data });
        });
        setTousLesTrucs(nouvelleListdeTrucs);
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* AJOUT */
  const onHandleChange = (e) => {
    const value = e.target.value;
    setAddState(value);
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const newTruc = { label: addState };

    await db
      .collection("destrucs")
      .add(newTruc)
      .then((res) => {
        /* AJOUT DE L'ID POUR MANIPS */
        res.update({ id: res.id });
        newTruc.id = res.id;

        //On ajoute ensuite à la liste le nouvel élément
        const nouvelleListdeTrucs = [newTruc];
        const newRefs = [...nouvelleListdeTrucs, ...tousLesTrucs];
        setTousLesTrucs(newRefs);
        setAddState("");
      });
  };

  /* DELETE */
  const onHandleDelete = async (id) => {
    await db
      .collection("destrucs")
      .doc(id)
      .delete()
      .then(() => {
        const list = [...tousLesTrucs];
        const newList = list.filter((v) => v.id !== id);
        setTousLesTrucs(newList);
      });
  };

  /* UPDATE */
  const onHandleUpdateChange = (e) => {
    const value = e.target.value;
    setUpdateState(value);
  };

  const onHandleUpdate = async (e) => {
    e.preventDefault();

    const res = db.collection("destrucs").doc(editState);
    res.update({ label: updateState });
    //on récupe les infos du doc
    res.get().then(function (doc) {
      const newList = tousLesTrucs.map((item) => {
        if (item.id === editState) return doc.data();
        return item;
      });
      setTousLesTrucs(newList);
      setUpdateState("");
      setEditState("");
    });
  };
  const onHandleEdit = (id) => {
    const one = tousLesTrucs.filter((item) => item.id === id);
    setEditState(id);
    setUpdateState(one[0].label);
  };
  const onHandleClear = () => {
    setEditState("");
    setUpdateState("");
  };

  return (
    <div className="container mt-5 text-center text-xxxl uppercase">
      <AjouterModifUnTruc
        onSubmit={onHandleUpdate}
        onChange={(e) => onHandleUpdateChange(e)}
        value={updateState}
        onClear={onHandleClear}
        btn="Modifier"
        id="updateUnTruc"
        visible={editState ? true : false}
      />
      <AjouterModifUnTruc
        onSubmit={onHandleSubmit}
        onChange={onHandleChange}
        value={addState}
        id="ajouteUnTruc"
        visible={editState ? false : true}
      />

      <ListDeTrucs
        list={tousLesTrucs}
        onEdit={onHandleEdit}
        onDelete={onHandleDelete}
      />
    </div>
  );
};

export default Dashboard;

const AjouterModifUnTruc = ({
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
            id={id}
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

const ListDeTrucs = ({ list, onDelete, onEdit }) => {
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
