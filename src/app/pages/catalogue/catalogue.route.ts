import { Routes } from "@angular/router";
import { CatalogueComponent } from "./catalogue.component";



export const ProductRoutes: Routes = [
    {
      path: 'catalogue/:id',
      component: CatalogueComponent,
      children: [
          
      ]
    }
  ]
              