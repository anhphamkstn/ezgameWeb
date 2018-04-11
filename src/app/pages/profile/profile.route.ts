import { Routes } from "@angular/router";
import { ProfileComponent } from "./profile.component";



export const ProductRoutes: Routes = [
    {
      path: 'profile',
      component: ProfileComponent,
      children: [
          
      ]
    }
  ]
              