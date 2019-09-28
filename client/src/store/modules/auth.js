import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'librarys/api';
import axios from 'axios';

// action types
const AUTH_SIGN_UP = 'auth/AUTH_SIGN_UP';
const AUTH_SIGN_IN = 'auth/AUTH_SIGN_IN';
const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const CHANGE_FILE_INPUT = 'auth/CHANGE_FILE_INPUT';

// action creators
export const changeInput = createAction(CHANGE_INPUT);
export const changeFileInput = createAction(CHANGE_FILE_INPUT);
export const signUp = createAction(AUTH_SIGN_UP, api.signUp);
export const signIn = createAction(AUTH_SIGN_IN, api.signIn);

// initial state
const initialState = Map({
  isLoggedIn: localStorage.getItem("jwt") ? true : false,
  token: localStorage.getItem("jwt"),
  profile_image: '',
  uesrname: '',
});


// reducer
export default handleActions({
  [CHANGE_INPUT]: (state, action) => {
    const { name, value } = action.payload;
    return state.set(name, value);
  },
  [CHANGE_FILE_INPUT]: (state, action) => {
    const { files } = action.payload;
    const file = files[0];

    return state.set('profile_image', file);
  },
  ...pender({
    type: AUTH_SIGN_UP,
    onSuccess: (state, action) => {
      const { token, newUser  } = action.payload.data;
      const { profile_image } = newUser;

      localStorage.setItem("jwt", token);
      localStorage.setItem("profile_image", profile_image);
      return state.set('isLoggedIn', true)
                  .set('token', token)
                  .set('profile_image', profile_image)
    },
    onError: (state, action) => {
      return state.set('errorMessage', 'Sign up Faild')
    }
  }),
  ...pender({
    type: AUTH_SIGN_IN,
    onSuccess: (state, action) => {
      const { token, user } = action.payload.data;
      const { profile_image } = user
      localStorage.setItem("jwt", token);
      localStorage.setItem("profile_image", profile_image);
      axios.defaults.headers.common['Authorization'] = action.payload.data.token;
      return state.set('isLoggedIn', true)
                  .set('token', token)
                  .set('profile_image', profile_image)
    },
    onError: (state, action) => {
      return state.set('errorMessage', 'Sign in Faild')
    }
  })
}, initialState);
