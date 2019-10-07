import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'librarys/api';

// action types
const GET_PROJECT_LIST = 'list/GET_PROJECT_LIST';
const GET_RECENT_LIST = 'list/GET_RECENT_LIST';

// action creators
export const getProjectList = createAction(GET_PROJECT_LIST, api.getProjectListBlockChain);
export const getRecentsList = createAction(GET_RECENT_LIST, api.getRecentsListBlockChain);

// initial state
const initialState = Map({
  projects: List(),
  recents: List(),
  lastPage: null,
});

// reducer
export default handleActions({
  ...pender({
    type: GET_PROJECT_LIST,
    onSuccess: (state, action) => {
      const { projects } = action.payload;

      return state.set('projects', fromJS(projects));
    }
  }),
  ...pender({
    type: GET_RECENT_LIST,
    onSuccess: (state, action) => {
      const { recents } = action.payload;

      return state.set('recents', fromJS(recents));
    }
  }),
}, initialState);
