import { Routes } from "@angular/router";
import { ProductComponent } from "./product.component";


export const ProductRoutes: Routes = [
    {
      path: 'product/:id',
      component: ProductComponent,
      children: [
          
      ]
    }
  ]
              