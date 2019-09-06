import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'librarys/api';

// action types
const INITIALIZE = 'editor/INITIALIZE';
const CHANGE_INPUT = 'editor/CHANGE_INPUT';
const CREATE_PROJECT = 'editor/WRITE_POST';

// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const createProject = createAction(CREATE_PROJECT, api.createProject);

// initial state
const initialState = Map({
  minimumcontribution: '',
  errorMessage: '',
});


// reducer
export default handleActions({
  [INITIALIZE]: (state, action) => initialState,
  [CHANGE_INPUT]: (state, action) => {
    const { name, value } = action.payload;
    return state.set(name, value);
  },
  ...pender({
    type: CREATE_PROJECT,
    onFailure : (state, action) => {
      const { message } = action.payload.data;
      return state.set('errorMessage', message);
    }
  }),
}, initialState);