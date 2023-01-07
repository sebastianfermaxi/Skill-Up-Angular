import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { LoginRes } from '../../interfaces/LoginRes';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private store:Store<AppState>
    ) { }

    registerReq$ = createEffect(() => this.actions$.pipe(
        ofType('[Auth] Register request'),
        mergeMap(({registerForm,type}) => 
            this.authService.register(registerForm)
            .pipe(
            map(() => {
                return ({ type: ''})//TODO: mostrar mensaje y redireccionar como esta en el registro.component
            }),
            catchError(() => EMPTY)
          )
        )
    ));

    loginReq$ = createEffect(() => this.actions$.pipe(
        ofType('[Auth] Login request'),
        mergeMap(({loginForm,type}) =>{
            console.log('en effect')
            
            return this.authService.login(loginForm)
            .pipe(
            map((loginRes:LoginRes) => {
                return ({ type: '[Auth] Login response', loginRes})
            }),
            catchError(() => EMPTY)
          )
        })
    ));

}