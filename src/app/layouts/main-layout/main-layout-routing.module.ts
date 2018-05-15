import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './main-layout.component';
import { HomeRoutes } from '../../pages/home/home.route';
import { ProductRoutes } from '../../pages/product/product.route';
import { LoginRoutes } from '../../pages/login/login.route';
import { RegisterRoutes } from '../../pages/register/register.route';
import { ProfileRoutes } from '../../pages/profile/profile.route';
import { PurchaseHistoryRoutes } from '../../pages/purchase-history/purchase-history.route';
import { CheckOutRoutes } from '../../pages/check-out/check-out.route';

const routes: Routes = [
  { 
    path: '', 
    component: MainLayoutComponent,
    children : [
      ...HomeRoutes,
      ...ProductRoutes,
      ...ProfileRoutes,
      ...LoginRoutes,
      ...RegisterRoutes,
      ...PurchaseHistoryRoutes,
      ...CheckOutRoutes
    ]

   },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainLayoutRoutingModule { }

export const routedComponents = [MainLayoutComponent];