import { Button } from "@material-ui/core";
import { ArrowLeft } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

const MyTitle = ({ title, to }) => {
  return (
    <div className="d-flex align-items-center">
      <div className="mr-3">
        <Link to={to}>
          <Button
            color="secondary"
            variant="text"
            className="bold"
            startIcon={<ArrowLeft />}
          >
            Retour
          </Button>
        </Link>
      </div>
      <div>
        <h1 className="mt-2 pt-1">{title}</h1>
      </div>
    </div>
  );
};

export default MyTitle;
