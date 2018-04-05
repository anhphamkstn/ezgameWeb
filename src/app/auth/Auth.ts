import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { environment } from '../../environments/environment';

declare var jQuery: any

@Injectable()
export class Auth {
    public loggedIn: boolean;
    public token: string;
    public auth2: any;

    constructor() {
        this.loggedIn = false;
        this.emptyLoginData();
    }

    login(fallBackedToken: string) {
        this.loggedIn = true;
        this.token = fallBackedToken;
        localStorage.setItem('jwt', this.token);
    }

    loginFromSession() {
        if (localStorage.getItem("jwt") !== null && this.loggedIn === false) {
            var jwt = localStorage.getItem("jwt");
            this.login(jwt);
        }
    }

    logout() {
        localStorage.clear();
    }

    isValidAuthentication(): boolean {
        if (localStorage.getItem('jwt') === null) {
            return false;
        }
        var jwt = localStorage.getItem("jwt");
        if (jwt) {
            if (this.check_token_expired(jwt)) {
                this.logout();
                return false;
            }
            else {
                this.loginFromSession();
                return true;
            }
        }
        return false;
    }

    emptyLoginData() {
        this.token = '';
    }

    check_token_expired(jwt: any) {
        var status = false
        jQuery.ajax({
            url: environment.getUrl('checkToken'),
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + jwt
            },
            success: data => {
                status = false
            },
            error: er => {
                status = true
            },
            cache: false,
            async: false
        })
        return status
    }
}
