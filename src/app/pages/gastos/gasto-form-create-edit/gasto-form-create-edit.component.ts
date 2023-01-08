import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
//import { HttpService } from 'src/app/core/services/http.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IBill } from 'src/app/core/interfaces/Bills';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';
import { ARSAccount, selectedAccount, selectedExchange, USDAccount } from 'src/app/core/state/selectors/accounts.selectors';
import { MatSelectChange } from '@angular/material/select';
import { accountToggle, exchangeToggle } from 'src/app/core/state/actions/account.actions';
import { Account } from 'src/app/core/interfaces/Account';
import { selectedUser } from 'src/app/core/state/selectors/user.selectors';
import { AccountsStates } from 'src/app/core/state/interfaces/state.interface';
import { AccountsService } from 'src/app/core/state/services/accounts.service';
import { TransactionsService } from 'src/app/core/state/services/transactions.service';

@Component({
  selector: 'ew-gasto-form-create-edit',
  templateUrl: './gasto-form-create-edit.component.html',
  styleUrls: ['./gasto-form-create-edit.component.scss']
})
export class GastoFormCreateEditComponent implements OnInit, OnDestroy {

  loading = false;
  error = false;
  successfully = false;
  today = new Date();
  accounts: any;
  userId!: number;
  ars!: Account;
  usd!: Account;
  exchange: AccountsStates['exchange']='ars';
  amount = new FormControl(Validators.required);
  concept = new FormControl('', Validators.minLength(4));
  to_account_id = new FormControl(Validators.required);
  account_id = new FormControl(Validators.required);
  date = new FormControl(this.today);
  newBill = new FormGroup({
    amount: this.amount,
    concept: this.concept,
    to_account_id: this.to_account_id,
    accountId: this.account_id,
    date: this.date
  });

  selectedAccount$: Observable<any> = new Observable();
  selectAccount: Subscription = new Subscription;
  arsAccount$: Observable<any> = new Observable();
  arsAccount: Subscription = new Subscription;
  usdAccount$: Observable<any> = new Observable();
  usdAccount: Subscription = new Subscription;
  currentUser$: Observable<any> = new Observable();
  exchange$: Observable<any> = new Observable();
  exchangeSub: Subscription = new Subscription;

  currentUser: Subscription = new Subscription;
  httpService: Subscription = new Subscription;
  @Input() billResponse: IBill | undefined;
  @Output() billResponseChange: EventEmitter<IBill> = new EventEmitter();

  constructor(
    //private http: HttpService,
    public dialog: MatDialog,
    private store: Store<AppState>,
    private transactionsS: TransactionsService
  ) {
    this.selectedAccount$ = this.store.select(selectedAccount);
    this.currentUser$ = this.store.select(selectedUser);
    this.arsAccount$ = this.store.select(ARSAccount);
    this.usdAccount$ = this.store.select(USDAccount);
    this.exchange$ = this.store.select(selectedExchange);
    this.selectAccount = this.selectedAccount$.subscribe(value => this.account_id.setValue(value));
    this.currentUser = this.currentUser$.subscribe(value => this.userId = value.id);
    this.arsAccount = this.arsAccount$.subscribe(value => this.ars = value);
    this.usdAccount = this.usdAccount$.subscribe(value => this.usd = value);
    this.exchangeSub = this.exchange$.subscribe(value => this.exchange = value);
  }

  ngOnInit(): void {
    //TODO: usar store
    /*
    this.http.get('/accounts/me').subscribe({
      next: (res: any) => {
        this.accounts = res
      },
      error: () => this.errorHandler()
    }
    )*/
  }

  ngOnDestroy(): void {
    this.selectAccount.unsubscribe();
    this.currentUser.unsubscribe();
    this.arsAccount.unsubscribe();
    this.usdAccount.unsubscribe();
    this.httpService.unsubscribe();
    this.exchangeSub.unsubscribe();
  }

  createBill(): void {
    this.openDialog('Confirmar', 'Esta seguro que quiere crear el pago?');
  }

  private openDialog(title: string, content: string): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      disableClose: true,
      data: {
        title,
        content
      }
    }).afterClosed().subscribe(response => {

      if (response.data) {
        this.loading = true;
        const billComplete = {
          amount: this.newBill.value.amount,
          concept: this.newBill.value.concept,
          date: this.setDate(this.newBill.value.date),
          type: 'payment',
          accountId: 5,//TODO: this.setAccount(this.newBill.value.accountId),
          userId: 4,//TODO this.userId,
          to_account_id: this.newBill.value.to_account_id
        }
        console.log('billComplete',this.exchange,billComplete,this.selectedAccount$)
        this.transactionsS.setTransaction(this.exchange,billComplete).subscribe({
          next: (res) => this.handleNext(res),
          error: () => this.errorHandler(),
          complete: () => {
            this.successfully = true;
            setTimeout(() => {
              this.successfully = false;
            }, 1500);
            this.newBill.reset()
          }
        })
      }
    })
  }

  private handleNext(res: any): void {
    this.loading = false;
    this.billResponseChange.emit(res);
  }

  private errorHandler(): void {
    this.loading = false;
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 1500);
  }

  private setDate(date: any = this.today): string {
    const hours = `${this.today.getHours()}:${this.today.getMinutes()}:${this.today.getMinutes()}`
    const toDate = new Date(date)
    const day = toDate.getDate();
    const month = toDate.getMonth() + 1;
    const year = toDate.getFullYear();

    if (day === this.today.getDate()) {
      return `${year}/${month}/${day} ${hours}`
    }
    return `${year}/${month}/${day} 01:00:00`
  }

  private setAccount(account: any): number {
    if (account === 'ARSAccount') {
      return this.accounts[0].id;
    }
    return this.accounts[1].id;
  }

  setCurrentAccount(event: MatSelectChange): void {
    this.store.dispatch(accountToggle({ selectedAccount: event.value }));
    let exchange:string =  event.value
    exchange = exchange.slice(0,3).toLocaleLowerCase();
    console.log('exchange',exchange)
    this.store.dispatch(exchangeToggle({ exchange: exchange as AccountsStates['exchange'] }));
  }

  resetForm(): void {
    this.loading = false;
    this.error = false;
    this.successfully = false;
    this.newBill.reset();
  }
}
