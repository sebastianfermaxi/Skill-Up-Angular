import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
//import { HttpService } from 'src/app/core/services/http.service';
import { IBalance } from 'src/app/core/interfaces/Balance';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';
import { chartTopPayData, trQueryMade } from 'src/app/core/state/selectors/transactions.selectors';
import { Observable, Subscription } from 'rxjs';
import { transactions_REQ, trBalanceData_REQ } from 'src/app/core/state/actions/transaction.actions';
import { ARSAccount, selectAccounts, USDAccount } from 'src/app/core/state/selectors/accounts.selectors';
import { AccountsStates } from 'src/app/core/state/interfaces/state.interface';
import { Account } from 'src/app/core/interfaces/Account';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.scss']
})
export class BalancesComponent implements OnInit, OnDestroy {

  loading = true;
  @Input() accountStatus: Account[] = []
  @Output() accountStatusChange: EventEmitter<IBalance[]> = new EventEmitter();

  trQueryMade$: Observable<any> = new Observable()
  trQueryMadeSub: Subscription = new Subscription;
  charData$: Observable<any> = new Observable()

  accountsQueryMade$: Observable<any> = new Observable()
  selectAccounts$: Observable<any> = new Observable()
  selectAccounts: Subscription = new Subscription;

  httpGet: Subscription = new Subscription;

  accountsQueryMade: boolean = false
  trQueryMade: boolean = false

  cuentas: any[] = []
  cuentaARS$: Observable<any> = new Observable();
  cuentaARSSub: Subscription = new Subscription;
  cuentaUSD$: Observable<any> = new Observable();
  cuentaUSDSub: Subscription = new Subscription;

  constructor(
    //private http: HttpService,
    private store: Store<AppState>
  ) {
    this.trQueryMade$ = this.store.select(trQueryMade);
    this.charData$ = this.store.select(chartTopPayData);
    this.selectAccounts$ = this.store.select(selectAccounts);
    this.cuentaARS$ = this.store.select(ARSAccount);
    this.cuentaUSD$ = this.store.select(USDAccount);
  }

  ngOnInit(): void {

    this.cuentaARSSub = this.cuentaARS$.subscribe((account) => {
      if (account) {
        this.cuentas.push({
          exchange: 'ARS',
          account
        });
        console.log(this.cuentas)
      }

    });
    this.cuentaUSDSub = this.cuentaUSD$.subscribe((account) => {
      if (account) {
        this.cuentas.push({
          exchange: 'USD',
          account
        });
        console.log(this.cuentas)
      }
    });

    /*TODO
    this.selectAccounts = this.selectAccounts$.subscribe((accountsStates: AccountsStates) => {
      if (accountsStates.accountsQueryMade) { //Si los datos ya estan cargados
        this.accountsQueryMade = true
        if (this.accountsQueryMade && this.trQueryMade) {
          this.store.dispatch(trBalanceData_REQ())//Procesa el grafico
        }
      }
    })*/
  }

  ngOnDestroy(): void {
    this.httpGet.unsubscribe();
    this.selectAccounts.unsubscribe();
    this.trQueryMadeSub.unsubscribe();
    this.cuentaARSSub.unsubscribe();
    this.cuentaUSDSub.unsubscribe();
  }

}
