import { Injectable, EventEmitter } from '@angular/core';
import { APIService } from '../auth/APIService';
import { environment } from '../../environments/environment';
import { Router,Event, NavigationEnd } from '@angular/router';


declare var jQuery: any; 
//import { avatarDefautlUrl } from "../constants/constant";
declare var Sbi: any;

@Injectable()
export class AppStateService {
    

    previousUrl = []

    constructor(
        private api: APIService, 
        private router: Router, 
    ) {
        this.router.events.subscribe( (event: Event) => {
            if (event instanceof NavigationEnd) {
                if (this.previousUrl.length < 10) {

                    this.previousUrl.unshift(event.urlAfterRedirects)
                } else {
                    this.previousUrl.pop()
                    this.previousUrl.unshift(event.urlAfterRedirects)
                }
            }
        });
    }
}
