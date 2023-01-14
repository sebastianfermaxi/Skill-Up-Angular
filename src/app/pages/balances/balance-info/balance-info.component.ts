import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'src/app/core/interfaces/Account';
import { IBalance } from 'src/app/core/interfaces/Balance';

@Component({
  selector: 'ew-balance-info',
  templateUrl: './balance-info.component.html',
  styleUrls: ['./balance-info.component.scss']
})
export class BalanceInfoComponent {

  @Input() accountStatus!: Account | undefined;
  @Input() index: number = 0;

  constructor() { }

  setDate(date: any): string {

    const toDate = new Date(date);
    const day = toDate.getDate();
    const month = toDate.getMonth() + 1;
    const year = toDate.getFullYear();

    return `${day}/${month}/${year}`
  }
}
