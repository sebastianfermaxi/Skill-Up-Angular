import { createReducer, on } from '@ngrx/store';
import { Transaction } from '../../interfaces/Transaction';
import { transactions_RES, transactions_REQ, trTopupPaymentData_REQ, trTopupPaymentData_RES, trTopupPaymentFilterChart_REQ, trTopupPaymentFilterChart_RES, trBalanceData_RES, trBalanceData_REQ, trTopupPaymentFilterTable, transactionsClean } from '../actions/transaction.actions';
import { TableData, TableRow, TransactionsState } from '../interfaces/state.interface';
import { DateTimeService } from 'src/app/core/services/date-time.service';

export const initialState:TransactionsState = {
  trQueryMade: false,
  origin: '',
  allTransactions: [],
  timeSpan: 'Last30Days',
  tableData: null,
  tableDataFilter: '',
  chartTopPayData: null,
  chartBalancesData: null
};

export const transactionsReducer = createReducer(
  initialState,
  on(transactions_REQ, (state) => 
    (state)
  ),
  on(transactions_RES, (state, { allTransactions }) => 
    ({...state, trQueryMade:true, allTransactions })
  ),

  on(trTopupPaymentData_REQ, (state) => (state)),
  on(trTopupPaymentData_RES, (state, {origin, tableData, chartTopPayData}) => ({...state, origin, tableData, chartTopPayData })),

  on(trTopupPaymentFilterChart_REQ, (state) => (state)),
  on(trTopupPaymentFilterChart_RES, (state, { chartTopPayData}) => ({...state, chartTopPayData })),

  on(trTopupPaymentFilterTable, (state, {tableDataFilter}) => ({...state, tableDataFilter })),

  on(trBalanceData_REQ, (state) => (state)),
  on(trBalanceData_RES, (state, {origin, chartBalancesData}) => ({...state, origin, chartBalancesData })),

  on(transactionsClean, (state) => ({...state, ...initialState })),
);