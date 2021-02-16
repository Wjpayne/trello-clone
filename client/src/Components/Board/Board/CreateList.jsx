import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addList } from "../../../Actions/Board";
import { TextField, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core";

const listStyles = makeStyles(() => ({
  button: {
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
    "&:hover": {
      backgroundColor: "#414f55",
    },
  },
}));

const CreateList = () => {
  const classes = listStyles();
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const formRef = useRef(null);
  useEffect(() => {
    formRef && formRef.current && formRef.current.scrollIntoView();
  }, [title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addList({ title }));
    setTitle("");
  };

  return !adding ? (
    <div className="create-list-button">
      <Button
        className={classes.button}
        variant="contained"
        onClick={() => setAdding(true)}
      >
        + Add a list
      </Button>
    </div>
  ) : (
    <div ref={formRef} className="create-list-form">
      <form onSubmit={(e) => onSubmit(e)}>
        <TextField
          InputProps={{
            disableUnderline: true,
          }}
          className={classes.input}
          variant="filled"
          margin="normal"
          fullWidth
          margin="normal"
          required
          label="Enter list title"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <Button
            className={classes.submit}
            type="submit"
            variant="contained"
            color="primary"
          >
            Add List
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
    </div>
  );
};

export default CreateList;
