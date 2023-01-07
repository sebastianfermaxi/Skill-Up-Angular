import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  StoreModule,
} from '@ngrx/store';
import { User } from './interfaces/state.interface';
import { accountsReducer } from './reducers/accounts.reducer';
import { transactionsReducer } from './reducers/transactions.reducer';
import { TransactionsEffects } from './effects/transactions.effects';

import { userReducer } from './reducers/user.reducer';
import { NgModule } from '@angular/core';

import { AccountsEffects } from './effects/accounts.effects';
import { AuthEffects } from './effects/auth.effects';


export const FEATURE_KEY = 'sharedState';
export interface AppState {
  user: any;
  accounts: any;
  transactions: any;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  user: userReducer,
  accounts: accountsReducer,
  transactions: transactionsReducer,
};


export const metaReducers: MetaReducer<AppState>[] = [];


@NgModule({
  imports: [StoreModule.forFeature(FEATURE_KEY, ROOT_REDUCERS, { metaReducers })],
})
export class SharedStateModule { }

export const selectSharedState = createFeatureSelector<AppState>(FEATURE_KEY);

export const ROOT_EFFECTS = [TransactionsEffects, AccountsEffects, AuthEffects]

