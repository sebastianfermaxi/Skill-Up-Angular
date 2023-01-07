import { createAction, props } from '@ngrx/store';
import { LoginRes } from '../../interfaces/LoginRes';
import { MeRes } from '../../interfaces/MeRes';
import { RegisterForm } from '../../interfaces/RegisterForm';
import { User } from '../interfaces/state.interface';

export const authRegister_REQ = createAction('[Auth] Register request', props<{ registerForm: RegisterForm }>());
//export const authRegister_RES = createAction('[Auth] Register response', props<{ user: User }>());
export const authLogin_REQ = createAction('[Auth] Login request', props<{ loginForm: RegisterForm }>());
export const authLogin_RES = createAction('[Auth] Login response', props<{ loginRes: LoginRes }>());
//export const authMe_REQ = createAction('[Auth] Me request');
export const authMe_RES = createAction('[Auth] Me response', props<{ meRes: MeRes, token: string }>());
export const authLogout = createAction('[Auth] Logout');
