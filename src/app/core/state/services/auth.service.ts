import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../../interfaces/LoginForm';
import { LoginRes } from '../../interfaces/LoginRes';
import { RegisterForm } from '../../interfaces/RegisterForm';
import { RegisterRes } from '../../interfaces/RegisterRes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(registerForm: RegisterForm): Observable<RegisterRes> {
    return this.http.post<RegisterRes>(environment.api_url + '/auth/register', registerForm)
  }

  login(loginForm: LoginForm): Observable<LoginRes> {
    return this.http.post<LoginRes>(environment.api_url + '/auth/login', loginForm)
  }

  me(): Observable<any> {
    return this.http.get<any>(environment.api_url + '/auth/me')
  }
}
