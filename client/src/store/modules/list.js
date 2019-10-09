import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'librarys/api';

// action types
const GET_PROJECT_LIST = 'list/GET_PROJECT_LIST';
const GET_RECENT_LIST = 'list/GET_RECENT_LIST';

// action creators
export const getProjectList = createAction(GET_PROJECT_LIST, api.getProjectList);
export const getRecentsList = createAction(GET_RECENT_LIST, api.getRecentList);


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
      const { data: projects } = action.payload;
      const lastPage = action.payload.headers['last-page'];
      console.log(projects);
      return state.set('projects', fromJS(projects))
                  .set('lastPage', parseInt(lastPage, 10))
    }
  }),
  ...pender({
    type: GET_RECENT_LIST,
    onSuccess: (state, action) => {
      const { data: recents } = action.payload;

      return state.set('recents', fromJS(recents))
    }
  }),
}, initialState);
