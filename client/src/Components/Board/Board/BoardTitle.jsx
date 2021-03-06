import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { renameBoard } from "../../../Actions/Board";
import { TextField } from "@material-ui/core";

const BoardTitle = ({ board }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(board.title);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(board.title);
  }, [board.title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(renameBoard(board._id, { title }));
    setEditing(false);
  };

  return !editing ? (
    <h2 className="board-title" onClick={() => setEditing(true)}>
      {board.title}
    </h2>
  ) : (
    <form className="board-title-form" onSubmit={(e) => onSubmit(e)}>
      <TextField
        
        variant="filled"
        InputProps={{
          disableUnderline: true,
        }}
        required
        value={title}
        size="small"
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
};

export default BoardTitle;
