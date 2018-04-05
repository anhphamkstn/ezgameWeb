import { Injectable } from '@angular/core';
import { Auth } from '../../auth/auth';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate} from '@angular/router';
import {AppStateService} from "../../services/app-state.service";
import {APIService} from '../../auth/APIService';

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