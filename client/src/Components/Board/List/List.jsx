import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { getList } from '../../../Actions/Board';
import ListTitle from './ListTitle';
import ListMenu from './ListMenu';
import Card from '../Card/Card';
import CreateCardForm from './CreateCardForm';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core"

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
    color: "white",
    "&:hover": {
      backgroundColor: "#414f55",
    },
    marginTop: "10px"
  },
}));



const List = ({ listId, index }) => {
  const classes = listStyles()
  const [addingCard, setAddingCard] = useState(false);
  const list = useSelector((state) =>
    state.board.board.listObjects.find((object) => object._id === listId)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList(listId));
  }, [dispatch, listId]);

  const createCardFormRef = useRef(null);
  useEffect(() => {
    addingCard && createCardFormRef.current.scrollIntoView();
  }, [addingCard]);

  return !list || (list && list.archived) ? (
    ''
  ) : (
    <Draggable draggableId={listId} index={index}>
      {(provided) => (
        <div
          className='list-wrapper'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className='list-top'>
            <ListTitle list={list} />
            <ListMenu listId={listId} />
          </div>
          <Droppable droppableId={listId} type='card'>
            {(provided) => (
              <div
                className={`list ${addingCard ? 'adding-card' : 'not-adding-card'}`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className='cards'>
                  {list.cards.map((cardId, index) => (
                    <Card key={cardId} cardId={cardId} list={list} index={index} />
                  ))}
                </div>
                {provided.placeholder}
                {addingCard && (
                  <div ref={createCardFormRef}>
                    <CreateCardForm listId={listId} setAdding={setAddingCard} />
                  </div>
                )}
              </div>
            )}
          </Droppable>
          {!addingCard && (
            <div className='create-card-button'>
              <Button className = {classes.button} variant='contained' onClick={() => setAddingCard(true)}>
                + Add a card
              </Button>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

List.propTypes = {
  listId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default List;