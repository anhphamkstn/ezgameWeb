import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate} from '@angular/router';
import {AppStateService} from "../../services/app-state.service";
import { Auth } from '../../authenticate/auth.service';
import { APIService } from '../../authenticate/api.service';


@Injectable()
export class MainLayoutGuard implements CanActivate {
  constructor(private authService: Auth, private router: Router, private appState: AppStateService, private api: APIService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {

    return true;
  }
}