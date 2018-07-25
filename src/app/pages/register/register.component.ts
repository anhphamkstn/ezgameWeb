import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { APIService } from '../../authenticate/api.service';

declare var jQuery: any;

export class SignUp {
  public email: string;
  public name: string;
  public phone: string;
  public password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit, OnInit {

  public stepMessage: string;
  public isLoading = false;
  public currentStep = 1;
  public newUserCreated: any;
  constructor(
    public router: Router,
    public api: APIService,
    public appState: AppStateService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    jQuery("#step-5").hide()
    jQuery("#goToDashboard").hide()
    let controller = this;
    setTimeout(function () {
      jQuery("#welcome-text").fadeOut("fast", function () {
        setTimeout(function () {
          jQuery("#main-form").fadeIn("fast", function () {
            jQuery("#footer").fadeIn("fast");
            jQuery("#signup-password").on('input', function () {
              jQuery("#signUpMessage").html("");
            });
            jQuery("#signup-retype-password").on('input', function () {
              jQuery("#signUpMessage").html("");
            });
          })
        }, 200)
      })
    }, 1500);
    window.onbeforeunload = function () {
      if (localStorage.getItem("jwt")) {
        localStorage.removeItem("jwt");
      }
    }
  }

  skip() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  onCreateNewAccount(event) {
    if (event) {
      event.preventDefault();
    }


    if (jQuery("#signup-password").val().length < 8) {
      jQuery("#signUpMessage").html("Mật khẩu tối thiểu 8 ký tự");
      return;
    }
    if (jQuery("#signup-password").val() != jQuery("#signup-retype-password").val()) {
      jQuery("#signUpMessage").html("Mật khẩu nhập lại không khớp");
      return;
    }

    this.checkEmailExists(jQuery("#signup-email").val())

  }

  createAccount() {

    var param = new SignUp();
    param.email = jQuery("#signup-email").val();
    param.name = jQuery("#full-name").val();
    param.phone = jQuery("#phone-1").val();
    param.password = jQuery("#signup-password").val();

    this.stepMessage = "Đợi chút nhé ...";

    var controller = this
    setTimeout(function () {
      controller.isLoading = true

      controller.api.post(environment.getUrl("register"), JSON.stringify(param)).map(res => res.json())
        .subscribe(response => {
          controller.isLoading = false
          controller.newUserCreated = response
          controller.stepMessage = "Tài khoản " + response.email + " tạo thành công !";
          controller.nextStep();
        },
          error => {
            controller.isLoading = false
            console.log(error);
            if (error.status == 500) controller.stepMessage = "Có lỗi xảy ra. Liên hệ admin để được hỗ trợ."
            else {
              if (error.json().message) {
                controller.stepMessage = error.json().result[0];
              }
              else {
                controller.stepMessage = "Có lỗi xảy ra. Liên hệ admin để được hỗ trợ."
              }
            }
          },
          () => {
            controller.isLoading = false
          })
    }, 0)

  }

  nextStep() {
    setTimeout(function () {
      jQuery('.plan').hover(
        function () { jQuery(this).addClass('plan-mouseover') },
        function () { jQuery(this).removeClass('plan-mouseover') }
      );
      jQuery("#accountBtnGroup").fadeIn("fast");
    }, 500)
    this.stepMessage = "";
    jQuery("#nextBtn").hide();
    if (this.currentStep == 1) {
      this.currentStep = 4;
    }
    if (this.currentStep == 3) {
      this.currentStep++;
    }
    var ele = "#complete" + (this.currentStep + 1);
    jQuery(ele).addClass("complete");
    this.currentStep++;
    jQuery("#step-1").hide();
    jQuery("#step-5").fadeIn("slow");
    jQuery("#goToDashboard").fadeIn("slow");
  }

  checkEmailExists(_email: string) {
    var param = {
      email: _email
    }
    var controller = this;
    return controller.api.post(environment.getUrl("check-email"), JSON.stringify(param)).map(res => res.json())
      .subscribe(response => {
        if (!response.error) {
          controller.createAccount();
          //controller.stepMessage = "Email chưa tồn tại!"
        }
        else {
          controller.stepMessage = "Email đã tồn tại!"
        }
      },
        error => {
          controller.isLoading = false
          console.log(error);
          if (error.status == 500) controller.stepMessage = "Có lỗi xảy ra. Liên hệ admin để được hỗ trợ."
        },
        () => {
          controller.isLoading = false
        })
  }


}
