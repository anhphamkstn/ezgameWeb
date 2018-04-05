import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';
import { APIService } from '../auth/APIService';
import { environment } from '../../environments/environment';
import { Router,Event, NavigationEnd } from '@angular/router';


declare var jQuery: any; 
//import { avatarDefautlUrl } from "../constants/constant";
declare var Sbi: any;

@Injectable()
export class AppStateService {
    public isMainDashBoard = new EventEmitter();
    public analAcvtivated = true;
    public trackAcvtivated = true;
    public geoAcvtivated = true;
    public terriAcvtivated = true;
    public user_profile = new User();
    public avatar_url: string;
    public expirationDate = "28/09/2017";
    public specialCase = false; //need refact    
    public isInMapView = false;

    public tooltipsterOpen = new EventEmitter();
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

    public isAdmin() {
        var bool = +this.user_profile.role_id <= 1
        return bool
    }

    public loginBi() {
        var user = "biadmin";
        var password = "biadmin";
        var cb = function (result, args, success) {
        };
        Sbi.sdk.api.authenticate({
            params: {
                user: user
                , password: password
            }
            , callback: {
                fn: cb
                , scope: this
            }
        });
    }

    public getUserProfile() {
        this.api.get(environment.getUrl('getProfileUrl')).map(res => res.json().result).subscribe(
            response => {
                this.user_profile = response;
                localStorage.setItem('role_id', this.user_profile.role_id);
                localStorage.setItem('user_id', this.user_profile.id.toString());
                this.avatar_url = this.getAvatar(this.user_profile);
                var notification_option = {
                    user_id: localStorage.getItem('user_id')
                }
            },
            error => {
                if (error.status == 500) {
                    this.getUserProfile()
                }
            },
            () => {
            }
        );
    }

    public getAvatar(profile) {
        var endPoint = environment.avatarUrl
        if (profile.avatar && profile.avatar != '-') {
            return endPoint + profile.avatar
        }
        return avatarDefautlUrl;
    }

    public getUserJoinedDay() {
        if (!this.user_profile.created_at) return "Founder";
        var date = new Date(this.user_profile.created_at.toString());
        return 'Member since ' + date.toLocaleDateString();
    }
}
