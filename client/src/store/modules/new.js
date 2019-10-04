import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

// action types
const INITIALIZE = 'new/INITIALIZE';
const CHANGE_INPUT = 'new/CHANGE_INPUT';
const CREATE_PROJECT = 'new/WRITE_POST';

// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const createProject = createAction(CREATE_PROJECT);

// initial state
const initialState = Map({
  minimumcontribution: '',
  title: '',
  detail: '',
  pictures: [],
  tags: [],
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
