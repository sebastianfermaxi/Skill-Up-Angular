import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects'; //TODO <---

import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { AccountsService } from '../services/accounts.service';

@Injectable()
export class AccountsEffects {

    constructor(
        private actions$: Actions,
        private accountsService: AccountsService,
        private store:Store<AppState>
    ) { }

    loadAccounts$ = createEffect(() => this.actions$.pipe(
        ofType('[Account] Request accounts'),
        mergeMap(() => this.accountsService.getAccounts()
            .pipe(
            map(([ARSAccount, USDAccount]) => {
                if(USDAccount){
                    return ({ type: '[Account] Store accounts', ARSAccount, USDAccount })
                }else{
                    return ({ type: '[Account] Create account'})
                }
            }),
            catchError(() => EMPTY)
          )
        )
    ));


    createAccounts$ = createEffect(() => this.actions$.pipe(
        ofType('[Account] Create account'),
        mergeMap(() => this.accountsService.generateAccount()
            .pipe(
            map(() => {
                return ({ type: '[Account] Request accounts'})
            }),
            catchError(() => EMPTY)
          )
        )
    ));

    //Intercepta el toggle acount para volver a procesar los datos de la tabla y grafico
    toggleAccounts$ = createEffect(() => this.actions$.pipe(
        ofType('[Account] Toggle account'),
        map(()=>{
            return {
                type: '[Transaction] Request Process Topup Payment Data'
              }
        })
    ));

    //Vacia las cuentas del store en el logout
    logoutAccounts$ = createEffect(() => this.actions$.pipe(
        ofType('[User] Logout'),
        map(()=>{
            return {
                type: '[Account] Clean accounts'
                }
        })
    ));

    ////////////////////////////////////////////////////////////
    ///////////////////METODOS AUXILIARES///////////////////////
    ////////////////////////////////////////////////////////////


}