import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'librarys/api';

// action types
const GET_PROJECT = 'Project/GET_PROJECT';


// action creators
export const getProject = createAction(GET_PROJECT, api.getProject);

// initial state
const initialState = Map({
  project: Map({

  })
});

// reducer
export default handleActions({
  ...pender({
    type: GET_PROJECT,
    onSuccess: (state, action) => {
      const { summary } = action.payload;

      return state.set('project', fromJS(summary));
    }
  })
}, initialState);
