import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoggerModule } from 'ngx-logger';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoggerModule.forRoot({
      //serverLoggingUrl: `${ environment.apiUrl}/v1/logs`,
      level: environment.logLevel,
      serverLogLevel: environment.serverLogLevel      
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
