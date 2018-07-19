import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router,Event, NavigationEnd, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../models/user.model';
import { APIService } from '../authenticate/api.service';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class AppStateService {
    
    public user_profile = new User();
    public avatar_url: string;
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

    public getAvatar(profile) {
        var endPoint = environment.endPoint
        if (profile.avatar && profile.avatar != '-') {
            return endPoint + profile.avatar
        }
        //return avatarDefautlUrl;
        return "";
    }

    public getUserData() {
        this.api.get(environment.getUrl('getProfileUrl')).map(res => res.json())
    }

    public getUserProfile() {
        this.api.get(environment.getUrl('getProfileUrl')).map(res => res.json()).subscribe(
            response => {
                this.user_profile = response;
                //this.avatar_url = this.getAvatar(this.user_profile);
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

    
}

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(private appState: AppStateService,) {}
 
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.appState.getUserData()
  }
}
