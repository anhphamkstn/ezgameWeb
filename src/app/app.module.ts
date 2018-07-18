import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module"
import { MainLayoutModule } from './layouts/main-layout/main-layout.module';
import { AppStateService } from './services/app-state.service';
import { HttpModule } from '@angular/http';
import { MessageService } from './services/message-service/message.service';
import { SharedModule } from './shared/shared.module';
import { SharedService } from './services/shared.service';
import { PurchaseService } from './services/purchase.service';
import { APIService } from './authenticate/api.service';
import { Auth } from './authenticate/auth.service';

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
