import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { authLogin_REQ, authLogin_RES } from 'src/app/core/state/actions/auth.actions';
import { AppState } from 'src/app/core/state/app.state';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/state/services/auth.service';
//import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;
  loading = false;
  title = 'Login';
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    //private http: HttpService,
    private authS: AuthService,
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.min(4)
      ]),
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    this.loading = true;
    if (!this.loginForm.valid) {
      this.loading = false;
      return;
    }
    //this.store.dispatch(authLogin_REQ({loginForm:this.loginForm.value}))

    this.authS.login(this.loginForm.value).subscribe({
      next: (res) => this.responseHandler(res),
      error: () => this.loading = false,
      complete: () => {
        this.loading = false;
        this.router.navigate(['home'])
      },
    });
  }

  private responseHandler(loginRes: any): void {
    if (loginRes.accessToken) {
      localStorage.setItem('token', loginRes.accessToken)
      this.store.dispatch(authLogin_RES({loginRes}))
    }
  }

  redirect(route: string): void {
    this.router.navigate([route])
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
