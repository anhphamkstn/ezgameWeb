import { Routes } from "@angular/router";
import { CheckOutComponent } from "./check-out.component";


export const ProductRoutes: Routes = [
    {
      path: 'check-out',
      component: CheckOutComponent,
      children: [
          
      ]
    }
  ]
              