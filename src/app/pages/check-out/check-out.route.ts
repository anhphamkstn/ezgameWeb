import { Routes } from "@angular/router";
import { CheckOutComponent } from "./check-out.component";
import { UserResolver } from "../../services/app-state.service";
import { CartResolver } from "../../services/purchase.service";


export const CheckOutRoutes: Routes = [
    {
      path: 'check-out',
      component: CheckOutComponent,
      resolve: {
        user : CartResolver
      }
    }
  ]
              