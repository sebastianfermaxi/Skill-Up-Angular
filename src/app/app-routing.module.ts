import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo:'login'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth-login/auth-login.module').then((m) => m.AuthLoginModule),        
  },
  { path:'**',
    loadChildren: () => import('./pages/page-not-found/page-not-found.module').then((m) => m.PageNotFoundModule), 
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
