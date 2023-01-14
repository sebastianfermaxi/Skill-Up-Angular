import { Account } from "./Account";

export interface MeRes{
  email: string
  first_name : string
  last_name : string
  USDAccount: Account;
  ARSAccount: Account;
}