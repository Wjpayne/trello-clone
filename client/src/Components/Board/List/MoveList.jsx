import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { moveList } from "../../../Actions/Board";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const moveStyles = makeStyles((theme) => ({
  dialog: {
    padding: 20,
  },
  moveListTop: {
    display: "flex",
  },
  moveListBottom: {
    display: "flex",
    flexDirection: "column",
  },
  moveListButton: {
    marginTop: 20,
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
}));

const MoveList = ({ listId, closeMenu }) => {
  const classes = moveStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [position, setPosition] = useState(0);
  const [positions, setPositions] = useState([0]);
  const lists = useSelector((state) => state.board.board.lists);
  const listObjects = useSelector((state) => state.board.board.listObjects);
  const dispatch = useDispatch();

  useEffect(() => {
    const mappedListObjects = listObjects
      .sort(
        (a, b) =>
          lists.findIndex((id) => id === a._id) -
          lists.findIndex((id) => id === b._id)
      )
      .map((list, index) => ({ list, index }));
    setPositions(
      mappedListObjects
        .filter((list) => !list.list.archived)
        .map((list) => list.index)
    );
    setPosition(
      mappedListObjects.findIndex((list) => list.list._id === listId)
    );
  }, [lists, listId, listObjects]);

  const onSubmit = async () => {
    dispatch(moveList(listId, { toIndex: position }));
    setOpenDialog(false);
    closeMenu();
  };

  return (
    <Fragment>
      <div onClick={() => setOpenDialog(true)}>Move This List</div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <div className={classes.moveListTop}>
          <DialogTitle>{"Move List"}</DialogTitle>
          <Button onClick={() => setOpenDialog(false)}>
            <CloseIcon />
          </Button>
        </div>
        <DialogActions className={classes.moveListBottom}>
          <FormControl>
            <InputLabel shrink>Position</InputLabel>
            <Select
              className={classes.input}
              InputProps={{
                disableUnderline: true,
              }}
              variant="filled"
              value={position}
              required
              onChange={(e) => setPosition(e.target.value)}
              displayEmpty
            >
              {positions.map((position, index) => (
                <MenuItem key={position} value={position}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
            <Button
              type="submit"
              variant="contained"
              className={classes.moveListButton}
              onClick={onSubmit}
            >
              Move List
            </Button>
          </FormControl>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

MoveList.propTypes = {
  listId: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default MoveList;
