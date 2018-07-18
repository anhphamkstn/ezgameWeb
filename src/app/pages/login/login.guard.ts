import { Injectable } from '@angular/core';
import {
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivate
} from '@angular/router';
import { Auth } from '../../authenticate/auth.service';

@Injectable()
export class LogInGuard implements CanActivate {
    constructor(private authService: Auth, private router: Router) {

    }
    canActivate(
        // Not using but worth knowing about
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        
        if (this.authService.isValidAuthentication()) {
            this.router.navigate(['/main']);
            return false;
           
        }
        return true;
    }
}