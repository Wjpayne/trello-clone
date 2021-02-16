  
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CreateChecklistItem from './CreateCheckListItem';
import ChecklistItem from './CheckListItem';
import { FormGroup, FormControl } from '@material-ui/core';
import useStyles from '../utils/ModalStyles';

const Checklist = ({ card }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <h3 className={classes.header}>Checklist</h3>
      <FormControl component='fieldset'>
        <FormGroup>
          {card.checklist.map((item) => (
            <ChecklistItem key={item._id} item={item} card={card} />
          ))}
        </FormGroup>
      </FormControl>
      <CreateChecklistItem cardId={card._id} />
    </Fragment>
  );
};

Checklist.propTypes = {
  card: PropTypes.object.isRequired,
};

export default Checklist;