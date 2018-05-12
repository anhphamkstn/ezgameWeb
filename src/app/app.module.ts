import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';

import {  FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module"
import { MainLayoutModule } from './layouts/main-layout/main-layout.module';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { AppStateService } from './services/app-state.service';
import { APIService } from './auth/APIService';
import { HttpModule } from '@angular/http';
import { MessageService } from './services/message-service/message.service';
import { MoneyPipe } from './pipes/money.pipe';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    CatalogueComponent,
    ProfileComponent,
    CheckOutComponent,
    MoneyPipe,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    MainLayoutModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    AppStateService,
    APIService,
    MessageService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
