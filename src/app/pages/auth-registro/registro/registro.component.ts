import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { resolve } from 'path';
import { Subscription } from 'rxjs';
import { RegisterForm } from 'src/app/core/interfaces/RegisterForm';
import { IUser } from 'src/app/core/interfaces/User';
import { authLogin_REQ, authRegister_REQ } from 'src/app/core/state/actions/auth.actions';
import { AppState } from 'src/app/core/state/app.state';
import { AuthService } from 'src/app/core/state/services/auth.service';
//import { HttpService } from 'src/app/core/services/http.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit, OnDestroy {
  registerForm: FormGroup | any;
  loading = false;
  title = 'Register';
  conditions = new FormControl(false, Validators.requiredTrue);
  conditionsText = "While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to your name ('Personal Information')."
  httpService: Subscription = new Subscription;
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authS: AuthService,
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.min(4)
      ]),
      conditions: this.conditions
    });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.httpService.unsubscribe();
  }

  onSubmit() {
    this.loading = true;
    if (!this.registerForm.valid) {
      this.loading = false;
      return;
    }

    const registerForm: RegisterForm = {
      first_name: this.registerForm.value.firstname,
      last_name: this.registerForm.value.lastname,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }
    console.log('newUser',registerForm)
    //TODO: Conviene usar storage?
    //this.store.dispatch(authRegister_REQ({registerForm}))
    this.httpService = this.authS.register(registerForm).subscribe({
      next: () => this.responseHandler(),
      error: (err) => this.errorHandler(err),
      complete: () => {
        this.loading = false;
        this.router.navigate(['/auth/login']);
      }
    });
  }

  showPolicyTerms(): void {
    this.openDialogPolicy('0ms', '0ms', 'Terms and conditions', this.conditionsText)
  }

  private openDialogPolicy(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    title: string,
    content: string
  ): void {
    this.dialog.open(DialogComponent, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: {
        title,
        content,
      },
    }).afterClosed().subscribe(response => {
      if (!response.data) {
        return this.conditions.reset(false);
      }
      this.loading = false;
      this.conditions.setValue(true);
    });
  }

  private responseHandler(): void {
    this.loading = false;
  }

  private errorHandler(error: any) {
    this.loading = false;
  }

  redirect(route: string): void {
    this.router.navigate([route])
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
