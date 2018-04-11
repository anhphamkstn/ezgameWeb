import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    CatalogueComponent,
    ProfileComponent,
    CheckOutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainLayoutModule,
    HttpModule
  ],
  providers: [
    AppStateService,
    APIService,
    MessageService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
