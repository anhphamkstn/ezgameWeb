import { NgModule } from '@angular/core';
import { MainLayoutComponent } from './main-layout.component';
import { MainLayoutRoutingModule } from './main-layout-routing.module'
import { MainLayoutGuard } from './main-layout.guard';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from '../../pages/home/home.component';
import { ProductComponent } from '../../pages/product/product.component';
import { CatalogueComponent } from '../../pages/catalogue/catalogue.component';
import { ProfileComponent } from '../../pages/profile/profile.component';
import { CheckOutComponent } from '../../pages/check-out/check-out.component';
import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { LogInGuard } from '../../pages/login/login.guard';
@NgModule({
    imports: [
        MainLayoutRoutingModule,
        SharedModule
    ],
    exports: [],
    declarations: [
        MainLayoutComponent,
        HomeComponent,
        ProductComponent,
        CatalogueComponent,
        ProfileComponent,
        CheckOutComponent,
        LoginComponent,
        RegisterComponent],
    providers: [
        MainLayoutGuard,
        LogInGuard
    ],
})
export class MainLayoutModule { }
