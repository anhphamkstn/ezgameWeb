import { Component, OnInit, AfterViewInit, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '../../services/app-state.service';
import { environment } from '../../../environments/environment';
import { APIService } from '../../authenticate/api.service';
import { Auth } from '../../authenticate/auth.service';

declare var jQuery: any;

export class LogIn {
  public email:string;
  public password:string;

  constructor() {

  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements AfterViewInit {
  @ViewChildren('input') viewChildren;
  @ViewChild('myView') myView: ElementRef;
  public isLogging = false;
  public errorMessage: string;
  public model: LogIn;
  googleUser = {};

  constructor(public router: Router,
      public api: APIService,
      public auth: Auth,
      public appStateService: AppStateService,
      ) {
      this.model = new LogIn();
  }


  loginWithToken(token) {
      let controller = this;
      APIService.isChecking = false;
      this.auth.login(token);
  }

  setupEnvironment() {
    var controller = this;
    this.api.get(environment.getUrl('getProfileUrl'))
    .map(res => res.json()).subscribe(
    response => {
        console.log(response)
        this.appStateService.user_profile = response;
        //this.appStateService.avatar_url = this.appStateService.getAvatar(this.appStateService.user_profile);
        this.router.navigate([APIService.current_path])
        jQuery(controller.myView.nativeElement).find('.logging').toggle('display')
    },
    error => {
        this.showErrorMessageFromJsonResponse(error);
        jQuery(controller.myView.nativeElement).find('.logging').toggle('display')
       
    },
    () => { });
  }

  login(event) {
      event.preventDefault();
      let controller = this;
      jQuery(controller.myView.nativeElement).find('.logging').toggle('display')
      let body = JSON.stringify(this.model);
      controller.api.post(environment.getUrl("loginUrl"), body, null, false)
          .map(res => res.json()).subscribe(
          response => {
              if (response.error) {
                this.showErrorMessageFromJsonResponse(response.error);
                jQuery(controller.myView.nativeElement).find('.logging').toggle('display')
                return
              }
              APIService.isChecking = false;
              controller.auth.login(response["token"]);
              controller.setupEnvironment();
          },
          error => {
              this.showErrorMessageFromJsonResponse(error);
              jQuery(controller.myView.nativeElement).find('.logging').toggle('display')
          },
          () => {

          })
  }


  ngAfterViewInit() {
      let controller = this;
      this.viewChildren.first.nativeElement.focus();
      jQuery("#email").on('input', function () {
          controller.errorMessage = "";
      })
      jQuery("#password").on('input', function () {
          controller.errorMessage = "";
      })
     
  }

  showErrorMessageFromJsonResponse(error: any): void {
      this.errorMessage = error
          || "Some errors happened with our server. Please try again later";
  }
 

  onSignUpClick(event) {
      this.router.navigate(['/registration']);
  }

}

