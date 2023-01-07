import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInyectorInterceptor } from './core/interceptors/token-inyector.interceptor';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { appEffects, appReducer } from './core/state/index';

import { ROOT_REDUCERS, ROOT_EFFECTS } from './core/state/app.state';
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { PerfilDetailModule } from './pages/usuarios/perfil-detail/perfil-detail.module';
import { PerfilEditComponent } from './pages/usuarios/perfil-edit/perfil-edit.component';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    PerfilDetailModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    EffectsModule.forRoot(ROOT_EFFECTS),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInyectorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
