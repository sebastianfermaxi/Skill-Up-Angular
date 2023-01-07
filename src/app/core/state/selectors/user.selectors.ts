import { AppState } from "../app.state";
import { AccountsStates, userState } from "../interfaces/state.interface";
import { createSelector } from '@ngrx/store';
import { IUser } from "../../interfaces/User";


export const selectUser = (state: AppState) => state.user;
//export const selectTransactions =  createFeatureSelector<AppState,TransactionsState>('transactions');

//! selectors
export const getEmail = (state: userState) => state.email;
export const getToken = (state: userState) => state.token;

export const selectedUser = createSelector(
  selectUser,
  (state: IUser) => state
);
