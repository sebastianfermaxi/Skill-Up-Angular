
import { on, createReducer, createSelector } from '@ngrx/store';
import { userState } from '../interfaces/state.interface';

import { authLogin_REQ, authLogin_RES, authLogout, authMe_RES } from '../actions/auth.actions';

export const initialState: userState = {
  first_name: null,
  last_name: null,
  email: null,
  token: null,
  autenticated: false
};

export const userReducer = createReducer(
  initialState,
  on(authLogin_RES, (state, { loginRes }) => ({
    ...state,
    first_name : loginRes.first_name,
    last_name : loginRes.last_name,
    email: loginRes.email,
    token: loginRes.token,
    autenticated: true,
  })),

  on(authLogout, () => (
    initialState
  )),

  on(authLogin_REQ,(state)=>state),
  on(authLogin_RES,(state)=>state),

  on(authMe_RES, (_state, { meRes, token })=>({
    first_name : meRes.first_name,
    last_name : meRes.last_name,
    email: meRes.email,
    token,
    autenticated: true,
  }))
);


