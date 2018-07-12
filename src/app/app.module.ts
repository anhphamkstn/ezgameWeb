import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module"
import { MainLayoutModule } from './layouts/main-layout/main-layout.module';
import { AppStateService } from './services/app-state.service';
import { APIService } from './auth/APIService';
import { HttpModule } from '@angular/http';
import { MessageService } from './services/message-service/message.service';
import { SharedModule } from './shared/shared.module';
import { Auth } from './auth/auth';
import { SharedService } from './services/shared.service';
import { PurchaseService } from './services/purchase.service';

@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    MainLayoutModule,
    HttpModule
    
  ],
  providers: [
    AppStateService,
    SharedService,
    PurchaseService,
    APIService,
    MessageService,
    Auth
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
