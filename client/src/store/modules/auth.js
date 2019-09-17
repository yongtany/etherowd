import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS } from 'immutable';

// action types

// action creators


// initial state
const initialState = Map({
  isLoggedIn: localStorage.getItem("jwt") ? true : false,
  token: localStorage.getItem("jwt"),
});


// reducer
export default handleActions({
}, initialState);
