import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const NoFound = () => (
  <>
    <h1 className="nofound container text-center mt-5 text-xxxl">ERROR 404</h1>
    <div className="container mt-3 d-flex justify-content-center">
      <Link to="/">
        <Button color="secondary" variant="text">
          Retour
        </Button>
      </Link>
    </div>
  </>
);

export default NoFound;
