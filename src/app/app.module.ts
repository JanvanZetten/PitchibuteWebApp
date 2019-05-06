import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './start/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrerComponent } from './start/registrer/registrer.component';
import { WelcomeComponent } from './start/welcome/welcome.component';
import {AuthenticationServiceModule} from './shared/authentication/authentication-service.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrerComponent,
    WelcomeComponent,

  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    AuthenticationServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
