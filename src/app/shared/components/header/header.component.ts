
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BreakpointObserver } from "@angular/cdk/layout";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';
import { User } from 'src/app/core/state/interfaces/state.interface';
import { Observable, Subscription } from 'rxjs';
import { selectedUser, selectUser } from 'src/app/core/state/selectors/user.selectors';



@Component({
  selector: 'ew-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  events: string[] = [];
  opened!: boolean;
  isMenuOpen = false;
  item: any;
  user!: User;

  currentUser$: Observable<any> = new Observable();
  currentUser: Subscription = new Subscription;
  @Output() snavChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.currentUser$ = this.store.select(selectUser);
    this.currentUser = this.currentUser$.subscribe(value => {
      this.user = value.autenticated && value
    });
  }

  ngOnDestroy(): void {
    this.currentUser.unsubscribe();
  }

  toggle(nav: MatSidenav) {
    const isSmallScreen =
      this.breakpointObserver.isMatched('(max-width: 599px)');
    if (isSmallScreen) {
      nav.toggle();
    }
  }

  menuState(newState: boolean): void {
    this.isMenuOpen = newState;
  }

  onClick(item: any) {
    this.item = item;
  }


  ngOnInit(): void { }

  logout() {
    this.store.dispatch({ type: '[User] Logout' });
    localStorage.getItem('token');
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }
}
