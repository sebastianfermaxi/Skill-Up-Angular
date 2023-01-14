import { Account } from "./Account"

export interface LoginRes{
  message: string
  token: string
  email: string
  first_name : string
  last_name : string
  USDAccount: Account;
  ARSAccount: Account;
}