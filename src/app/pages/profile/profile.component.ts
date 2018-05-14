import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../auth/APIService';
import { MessageService } from '../../services/message-service/message.service';
import { AppStateService } from '../../services/app-state.service';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {

  isUserLoading: boolean;
  public profileNewInfo = new User();
  newPasswordMatch: any;
  passwordOK: boolean;
  incorrectPass: boolean;
  canChanged: boolean;
  public oldPassword = new FormControl();
  public newPassword = new FormControl();
  public rePassword = new FormControl();
  public oldPass: string;
  public newPass: string;
  public rePass: string;
  public sub: any;

  constructor(
    public route: ActivatedRoute,
    public api: APIService,
    public messageService: MessageService,
    public appState: AppStateService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let controller = this;
    /* This is a workaround of the bug: Expression has changed after it was checked */
    controller.setUserInfo();

    this.oldPassword.valueChanges.debounceTime(1000).distinctUntilChanged()
      .subscribe(value => {
        this.incorrectPass = false;
        this.oldPass = value;
        this.canChanged = this.verifyPassword();
      });
    this.newPassword.valueChanges.debounceTime(500).distinctUntilChanged()
      .subscribe(value => {
        this.newPass = value;
        this.passwordOK = this.isValidPassword();
        this.newPasswordMatch = this.passwordMatch();
      });
    this.rePassword.valueChanges.debounceTime(0).distinctUntilChanged()
      .subscribe(value => {
        this.rePass = value;
        this.newPasswordMatch = this.passwordMatch();
      });
  }

  saveUserInfo(event) {
    event.preventDefault();
    if (this.profileEditForm.valid) {
        if (this.newPasswordMatch) {
            this.profileNewInfo.password = this.newPass;
        }
        let params: URLSearchParams = new URLSearchParams();
        params.set('type', 'avatar');
        this.profileNewInfo.setting.timezone = jQuery('#timezone').select2('data')[0].saveText;
        if (this.avatarFile) {
            this.api.uploadFile(environment.getUrl('upload'), this.avatarFile, params).map(res => res.json())
                .subscribe(
                    response => {
                        var result = response.result
                        var controller = this
                        response.result.path = response.result.media.origin
                        controller.profileNewInfo.avatar = response.result.path.substring(8);
                        this.updateProfile()
                    })
        } else {
            this.updateProfile()
        }
    }
}

  verifyPassword() {
    if (!this.oldPass || /^\s*$/.test(this.oldPass)) {
      return false;
    }
    return true;
  }

  isValidPassword() {
    if (!this.newPass || /^\s*$/.test(this.newPass)) {
      return false;
    }
    if (this.newPass.length < 8) {
      return false;
    }
    return true;
  }

  passwordMatch() {
    if (!this.newPass || /^\s*$/.test(this.newPass)) {
      return false;
    }
    if (!this.rePass || /^\s*$/.test(this.rePass)) {
      return false;
    }
    if (this.newPass !== this.rePass) {
      return false;
    }
    return true;
  }

  setUserInfo() {
    let controller = this;
    this.sub = this.route.params.subscribe(params => {
      this.isUserLoading = true;
      this.getUserInfo().subscribe(
        userInfo => {
          controller.profileNewInfo = userInfo;
        },
        error => {
          this.messageService.showErrorMessage("myMessage", error);
        },
        () => {
          this.isUserLoading = false;
        })
    });
   
  }

  getUserInfo() {
    let params: URLSearchParams = new URLSearchParams();
    return this.api.get(environment.getUrl('getProfileUrl'), params)
      .map(res => res.json());
  }

}
