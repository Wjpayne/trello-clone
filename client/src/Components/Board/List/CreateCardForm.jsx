import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { addCard } from "../../../Actions/Board";
import { Card, CardContent, TextField, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core";

const listStyles = makeStyles(() => ({
  button: {
    marginTop: "10px",
    color: "#bbbc75",
    transition: "0.3s",
    "&:hover": {
      color: "#bbbc75",
      backgroundColor: "white",
    },
    backgroundColor: "white",
  },
  input: {
    "& .Mui-focused": {
      color: "#585858",
    },
  },

  submit: {
    backgroundColor: "#414f55",
    color: "white",
    "&:hover": {
      backgroundColor: "#414f55",
    },
    marginTop: "10px",
  },
}));

const CreateCardForm = ({ listId, setAdding }) => {
  const classes = listStyles();
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const formRef = useRef(null);
  useEffect(() => {
    formRef && formRef.current && formRef.current.scrollIntoView();
  }, [title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addCard({ title, listId }));
    setTitle("");
  };

  return (
    <form
      ref={formRef}
      className="create-card-form"
      onSubmit={(e) => onSubmit(e)}
    >
      <Card>
        <CardContent className="card-edit-content">
          <TextField
          className = {classes.input}
            InputProps={{
              disableUnderline: true,
            }}
            className={classes.input}
            variant="filled"
            margin="normal"
            fullWidth
            multiline
            required
            label="Enter a title for this card"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSubmit(e)}
          />
        </CardContent>
      </Card>
      <div className="card-actions">
        <Button className={classes.button} type="submit" variant="contained">
          Add Card
        </Button>
        <Button
          onClick={() => {
            setAdding(false);
            setTitle("");
          }}
        >
          <CloseIcon />
        </Button>
      </div>
    </form>
  );
};

CreateCardForm.propTypes = {
  listId: PropTypes.string.isRequired,
  setAdding: PropTypes.func.isRequired,
};

export default CreateCardForm;
