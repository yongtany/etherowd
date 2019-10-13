import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'librarys/api';

// action types
const GET_PROJECT = 'project/GET_PROJECT';
const GET_RANK = 'project/GET_RANK';

// action creators
export const getProject = createAction(GET_PROJECT, api.getProjectBlockChain);
export const getRank = createAction(GET_RANK, api.getInvestorsByrank);

// initial state
const initialState = Map({
  project: Map({

  }),
  investors: Map({

  })
});

// reducer
export default handleActions({
  ...pender({
    type: GET_PROJECT,
    onSuccess: (state, action) => {
      const  summary  = action.payload;

      // console.log(summary.investors[0][0]);
      // console.log(summary.investors[0][1])

      return state.set('project', fromJS(summary))
            // .state.set('investors', fromJS(summary.investors))
    }
  }),
  // ...pender({
  //   type: GET_RANK,
  //   onSuccess: (state, action) => {
  //     const  summary  = action.payload;
  //     console.log(summary);
  //     return state.set('investors', fromJS(summary));
  //   }
  // })

}, initialState);
