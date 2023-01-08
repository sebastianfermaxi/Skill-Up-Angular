import { Injectable, Type } from '@angular/core';
import { from, Observable, of, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AccountsStates, TransactionsState } from '../interfaces/state.interface';
import { APITransactions } from '../../interfaces/APITransactions';
import { Transaction } from '../../interfaces/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  ingresosEgresos: Transaction[] = []

  constructor(private http: HttpClient) { }

  setTransaction(exchange: AccountsStates['exchange'],billComplete:any): Observable<any>{
    return this.http.post(environment.api_url +`/accounts/${exchange}/transfer`, billComplete)
  }

  getTransactions(): Observable<TransactionsState>{
    return this.getMultipleTransactions('/transactions')
  }

  getMultipleTransactions(route:string):Observable<any>{
    return this.http.get<APITransactions>(environment.api_url + route).pipe( // fetch the page
      switchMap( (res:APITransactions) => {
        res.data.forEach((dat:Transaction) => {this.ingresosEgresos.push(dat)}) //Array con todas las transacciones
        if(res.nextPage && this.ingresosEgresos.length <150){//Recursividad hasta cumplir la condicion
          return this.getMultipleTransactions(res.nextPage)
        }else{//Muestra los datos
          return of({allTransactions:this.ingresosEgresos})
        }
      }
      )
    );
  }

}

