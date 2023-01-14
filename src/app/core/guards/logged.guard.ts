import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { MeRes } from '../interfaces/MeRes';
//import { HttpService } from '../services/http.service';
import { accounts_REQ, accounts_RES } from '../state/actions/account.actions';
import { authLogin_RES, authMe_RES } from '../state/actions/auth.actions';
import { AuthService } from '../state/services/auth.service';
import jwt_decode from "jwt-decode";
import { JWT } from '../interfaces/JWT';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {

  constructor(
    private _router: Router,
    //private http: HttpService,
    private authS: AuthService,
    private store: Store,
    private dialog: MatDialog
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    const token = localStorage.getItem('token');

    if (!token) {
      this._router.navigateByUrl('/auth');
      return false;
    }


    //Sesion expirada
    let now = new Date()
    let decodeToken:JWT = jwt_decode(token)
    let exp = new Date(decodeToken.exp*1000)
    if(now>exp){
      this.store.dispatch({ type: '[User] Logout' });
    }

    this.authS.me().subscribe({
      next: (meRes: MeRes) => {
        console.log(meRes)
        this.store.dispatch(authMe_RES( {meRes, token: token ? token : ''} ))
        this.store.dispatch(accounts_RES( { ARSAccount: meRes.ARSAccount, USDAccount: meRes.USDAccount } ))
      },
      error: () => this.openDialog('Sesión expirada', 'Debe volver a iniciar sisión'),
      complete: () => true
    })
    return true;
  }

  private openDialog(title: string, content: string): void {

    this.dialog.open(AlertComponent, {
      width: '400px',
      disableClose: true,
      data: {
        title,
        content
      }
    }).afterClosed().subscribe(() => {
      this._router.navigate(['/auth']);
      return false;
    })
  }
}
