import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'librarys/api';

// action types
const GET_REQUEST_LIST = 'list/GET_PROJECT_LIST';


// action creators
export const getRequestList = createAction(GET_REQUEST_LIST, api.getRequestList);


// initial state
const initialState = Map({
  requests: List(),
  approversCount: ''
});


// reducer
export default handleActions({
  ...pender({
    type: GET_REQUEST_LIST,
    onSuccess: (state, action) => {
      const { requests, approversCount } = action.payload;

      return state.set('requests', fromJS(requests))
                  .set('approversCount', approversCount);
    }
  }),
}, initialState);
