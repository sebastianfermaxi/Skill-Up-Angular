import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { accountCreate, accountsClean, accounts_REQ, accounts_RES, accountToggle, exchangeToggle } from '../actions/account.actions';
import { AccountsStates } from '../interfaces/state.interface';


export const initialState:AccountsStates = {
  accountsQueryMade: false,
  selectedAccount: 'ARSAccount',
  ARSAccount: null,
  USDAccount: null,
  exchange: 'ars'
};

export const accountsReducer = createReducer(
  initialState,
  on(accounts_REQ, (state) => (state)),
  on(accounts_RES, (state, { ARSAccount, USDAccount }) => ({ ...state, AccountsQueryMade: true, ARSAccount, USDAccount })),
  
  on(accountCreate, (state) => (state)),

  on(accountToggle, (state, { selectedAccount }) => ({ ...state, selectedAccount })),
  on(exchangeToggle, (state, { exchange }) => ({ ...state, exchange })),

  on(accountsClean, (state) => ({...state, ...initialState }))
);