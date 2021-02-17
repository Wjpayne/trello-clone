import axios from "axios";
import { setAlert } from "./Alert";
import {
  CLEAR_BOARD,
  GET_BOARDS,
  GET_BOARD,
  ADD_BOARD,
  BOARD_ERROR,
  RENAME_BOARD,
  GET_LIST,
  ADD_LIST,
  RENAME_LIST,
  ARCHIVE_LIST,
  GET_CARD,
  ADD_CARD,
  EDIT_CARD,
  MOVE_CARD,
  ARCHIVE_CARD,
  DELETE_CARD,
  GET_ACTIVITY,
  ADD_MEMBER,
  MOVE_LIST,
  ADD_CARD_MEMBER,
  ADD_CHECKLIST_ITEM,
  EDIT_CHECKLIST_ITEM,
  COMPLETE_CHECKLIST_ITEM,
  DELETE_CHECKLIST_ITEM,
} from "./Types";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};



// // Get boards
export const getBoards = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_BOARD });

    const res = await axios.get( "/boards");

    dispatch({
      type: GET_BOARDS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get board
export const getBoard = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/boards/${id}`);

    if (res) {
      axios.defaults.headers.common["boardId"] = id;
    } else {
      delete axios.defaults.headers.common["boardId"];
    }

    dispatch({
      type: GET_BOARD,
      payload: { ...res.data, listObjects: [], cardObjects: [] },
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add board
export const addBoard = (formData, history) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    const res = await axios.post("/boards", body, config);

    dispatch({
      type: ADD_BOARD,
      payload: res.data,
    });

    dispatch(setAlert("Board Created", "success"));

    history.push(`/board/${res.data._id}`);
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Rename board
export const renameBoard = (boardId, formData) => async (dispatch) => {
  try {
    const res = await axios.patch(
      `/boards/rename/${boardId}`,
      formData,
      config
    );

    dispatch({
      type: RENAME_BOARD,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get list
export const getList = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/lists/${id}`);

    dispatch({
      type: GET_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add list
export const addList = (formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    const res = await axios.post("/lists", body, config);

    dispatch({
      type: ADD_LIST,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Rename list
export const renameList = (listId, formData) => async (dispatch) => {
  try {
    const res = await axios.patch(`/lists/rename/${listId}`, formData, config);

    dispatch({
      type: RENAME_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Archive/Unarchive list
export const archiveList = (listId, archive) => async (dispatch) => {
  try {
    const res = await axios.patch(`/lists/archive/${archive}/${listId}`);

    dispatch({
      type: ARCHIVE_LIST,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get card
export const getCard = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/cards/${id}`);

    dispatch({
      type: GET_CARD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add card
export const addCard = (formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    const res = await axios.post("/cards", body, config);

    dispatch({
      type: ADD_CARD,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit card
export const editCard = (cardId, formData) => async (dispatch) => {
  try {
    const res = await axios.patch(`/cards/edit/${cardId}`, formData, config);

    dispatch({
      type: EDIT_CARD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Move card
export const moveCard = (cardId, formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    const res = await axios.patch(`/cards/move/${cardId}`, body, config);

    dispatch({
      type: MOVE_CARD,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Archive/Unarchive card
export const archiveCard = (cardId, archive) => async (dispatch) => {
  try {
    const res = await axios.patch(`/cards/archive/${archive}/${cardId}`);

    dispatch({
      type: ARCHIVE_CARD,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete card
export const deleteCard = (listId, cardId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/cards/${listId}/${cardId}`);

    dispatch({
      type: DELETE_CARD,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get activity
export const getActivity = () => async (dispatch) => {
  try {
    const boardId = axios.defaults.headers.common["boardId"];

    const res = await axios.get(`/boards/activity/${boardId}`);

    dispatch({
      type: GET_ACTIVITY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add member
export const addMember = (userId) => async (dispatch) => {
  try {
    const res = await axios.put(`/boards/addMember/${userId}`);

    dispatch({
      type: ADD_MEMBER,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Move list
export const moveList = (listId, formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    const res = await axios.patch(`/lists/move/${listId}`, body, config);

    dispatch({
      type: MOVE_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add card member
export const addCardMember = (formData) => async (dispatch) => {
  try {
    const { add, cardId, userId } = formData;

    const res = await axios.put(`/cards/addMember/${add}/${cardId}/${userId}`);

    dispatch({
      type: ADD_CARD_MEMBER,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add checklist item
export const addChecklistItem = (cardId, formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    const res = await axios.post(`/checklists/${cardId}`, body, config);

    dispatch({
      type: ADD_CHECKLIST_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit checklist item
export const editChecklistItem = (cardId, itemId, formData) => async (
  dispatch
) => {
  try {
    const body = JSON.stringify(formData);

    const res = await axios.patch(
      `/checklists/${cardId}/${itemId}`,
      body,
      config
    );

    dispatch({
      type: EDIT_CHECKLIST_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Complete/Uncomplete checklist item
export const completeChecklistItem = (formData) => async (dispatch) => {
  try {
    const { cardId, complete, itemId } = formData;

    const res = await axios.patch(
      `/checklists/${cardId}/${complete}/${itemId}`
    );

    dispatch({
      type: COMPLETE_CHECKLIST_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete checklist item
export const deleteChecklistItem = (cardId, itemId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/checklists/${cardId}/${itemId}`);

    dispatch({
      type: DELETE_CHECKLIST_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


//LOCAL!!!!!!!

// const url = "http://localhost:5000";

// // Get boards
// export const getBoards = () => async (dispatch) => {
//   try {
//     dispatch({ type: CLEAR_BOARD });

//     const res = await axios.get( url + "/boards");

//     dispatch({
//       type: GET_BOARDS,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: BOARD_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Get board
// export const getBoard = (id) => async (dispatch) => {
//   try {
//     const res = await axios.get( url + `/boards/${id}`);

//     if (res) {
//       axios.defaults.headers.common["boardId"] = id;
//     } else {
//       delete axios.defaults.headers.common["boardId"];
//     }

//     dispatch({
//       type: GET_BOARD,
//       payload: { ...res.data, listObjects: [], cardObjects: [] },
//     });
//   } catch (err) {
//     dispatch({
//       type: BOARD_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Add board
// export const addBoard = (formData, history) => async (dispatch) => {
//   try {
//     const body = JSON.stringify(formData);

//     const res = await axios.post( url + "/boards", body, config);

//     dispatch({
//       type: ADD_BOARD,
//       payload: res.data,
//     });

//     dispatch(setAlert("Board Created", "success"));

//     history.push(`/board/${res.data._id}`);
//   } catch (err) {
//     dispatch({
//       type: BOARD_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Rename board
// export const renameBoard = (boardId, formData) => async (dispatch) => {
//   try {
//     const res = await axios.patch(
//       url +  `/boards/rename/${boardId}`,
//       formData,
//       config
//     );

//     dispatch({
//       type: RENAME_BOARD,
//       payload: res.data,
//     });

//     dispatch(getActivity());
//   } catch (err) {
//     dispatch({
//       type: BOARD_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Get list
// export const getList = (id) => async (dispatch) => {
//   try {
//     const res = await axios.get( url + `/lists/${id}`);

//     dispatch({
//       type: GET_LIST,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: BOARD_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Add list
// export const addList = (formData) => async (dispatch) => {
//   try {
//     const body = JSON.stringify(formData);

//     const res = await axios.post( url + "/lists", body, config);

//     dispatch({
//       type: ADD_LIST,
//       payload: res.data,
//     });

//     dispatch(getActivity());
//   } catch (err) {
//     dispatch({
//       type: BOARD_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Rename list
// export const renameList = (listId, formData) => async (dispatch) => {
//   try {
//     const res = await axios.patch( url + `/lists/rename/${listId}`, formData, config);

//     dispatch({
//       type: RENAME_LIST,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: BOARD_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Archive/Unarchive list
// export const archiveList = (listId, archive) => async (dispatch) => {
//   try {
//     const res = await axios.patch( url + `/lists/archive/${archive}/${listId}`);

//     dispatch({
//       type: ARCHIVE_LIST,
//       payload: res.data,
//     });

//     dispatch(getActivity());
//   } catch (err) {
//     dispatch({
//       type: BOARD_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Get card
// export const getCard = (id) => async (dispatch) => {
//   try {
//     const res = await axios.get( url + `/cards/${id}`);

//     dispatch({
//       type: GET_CARD,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: BOARD_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Add card
// export const addCard = (formData) => async (dispatch) => {
//   try {
//     const body = JSON.stringify(formData);

//     const res = await axios.post( url + "/cards", body, config);

//     dispatch({
//       type: ADD_CARD,
//       payload: res.data,
//     });

//     dispatch(getActivity());
//   } catch (err) {
//     dispatch({
//       type: BOARD_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Edit card
// export const editCard = (cardId, formData) => async (dispatch) => {
//   try {
//     const res = await axios.patch( url + `/cards/edit/${cardId}`, formData, config);

//     dispatch({
//       type: EDIT_CARD,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: BOARD_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Move card
// export const moveCard = (cardId, formData) => async (dispatch) => {
//   try {
//     const body = JSON.stringify(formData);

//     const res = await axios.patch( url + `/cards/move/${cardId}`, body, config);

//     dispatch({
//       type: MOVE_CARD,
//       payload: res.data,
//     });

//     dispatch(getActivity());
//   } catch (err) {
//     dispatch({
//       type: BOARD_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Archive/Unarchive card
// export const archiveCard = (cardId, archive) => async (dispatch) => {
//   try {
//     const res = await axios.patch( url + `/cards/archive/${archive}/${cardId}`);

//     dispatch({
//       type: ARCHIVE_CARD,
//       payload: res.data,
//     });

//     dispatch(getActivity());
//   } catch (err) {
//     dispatch({
//       type: BOARD_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Delete card
// export const deleteCard = (listId, cardId) => async (dispatch) => {
//   try {
//     const res = await axios.delete( url + `/cards/${listId}/${cardId}`);

//     dispatch({
//       type: DELETE_CARD,
//       payload: res.data,
//     });

//     dispatch(getActivity());
//   } catch (err) {
//     dispatch({
//       type: BOARD_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Get activity
// export const getActivity = () => async (dispatch) => {
//   try {
//     const boardId = axios.defaults.headers.common["boardId"];

//     const res = await axios.get( url + `/boards/activity/${boardId}`);

//     dispatch({
//       type: GET_ACTIVITY,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: BOARD_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Add member
// export const addMember = (userId) => async (dispatch) => {
//   try {
//     const res = await axios.put( url + `/boards/addMember/${userId}`);

//     dispatch({
//       type: ADD_MEMBER,
//       payload: res.data,
//     });

//     dispatch(getActivity());
//   } catch (err) {
//     dispatch({
//       type: BOARD_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Move list
// export const moveList = (listId, formData) => async (dispatch) => {
//   try {
//     const body = JSON.stringify(formData);

//     const res = await axios.patch( url + `/lists/move/${listId}`, body, config);

//     dispatch({
//       type: MOVE_LIST,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: BOARD_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Add card member
// export const addCardMember = (formData) => async (dispatch) => {
//   try {
//     const { add, cardId, userId } = formData;

//     const res = await axios.put( url + `/cards/addMember/${add}/${cardId}/${userId}`);

//     dispatch({
//       type: ADD_CARD_MEMBER,
//       payload: res.data,
//     });

//     dispatch(getActivity());
//   } catch (err) {
//     dispatch({
//       type: BOARD_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Add checklist item
// export const addChecklistItem = (cardId, formData) => async (dispatch) => {
//   try {
//     const body = JSON.stringify(formData);

//     const res = await axios.post( url + `/checklists/${cardId}`, body, config);

//     dispatch({
//       type: ADD_CHECKLIST_ITEM,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: BOARD_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Edit checklist item
// export const editChecklistItem = (cardId, itemId, formData) => async (
//   dispatch
// ) => {
//   try {
//     const body = JSON.stringify(formData);

//     const res = await axios.patch(
//       url + `/checklists/${cardId}/${itemId}`,
//       body,
//       config
//     );

//     dispatch({
//       type: EDIT_CHECKLIST_ITEM,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: BOARD_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Complete/Uncomplete checklist item
// export const completeChecklistItem = (formData) => async (dispatch) => {
//   try {
//     const { cardId, complete, itemId } = formData;

//     const res = await axios.patch(
//       url +  `/checklists/${cardId}/${complete}/${itemId}`
//     );

//     dispatch({
//       type: COMPLETE_CHECKLIST_ITEM,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: BOARD_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Delete checklist item
// export const deleteChecklistItem = (cardId, itemId) => async (dispatch) => {
//   try {
//     const res = await axios.delete( url + `/checklists/${cardId}/${itemId}`);

//     dispatch({
//       type: DELETE_CHECKLIST_ITEM,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: BOARD_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };
