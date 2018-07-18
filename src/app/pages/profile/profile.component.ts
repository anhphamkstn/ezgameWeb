import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message-service/message.service';
import { AppStateService } from '../../services/app-state.service';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { APIService } from '../../authenticate/api.service';
import { Auth } from '../../authenticate/auth.service';


declare var jQuery: any;

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

  public profileEditForm = new FormGroup({
    name: new FormControl(this.profileNewInfo.name,Validators.required),
    email: new FormControl(
        {
            value: this.profileNewInfo.email,
            disabled: true
        },
        [Validators.email,Validators.required]
    ),
    phone: new FormControl(this.profileNewInfo.phone, [
        Validators.required
    ]) 
});

  constructor(
    public route: ActivatedRoute,
    public api: APIService,
    public messageService: MessageService,
    public authService: Auth,
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
      this.updateProfile()
    }
  }

  signOut(event) {
    event.preventDefault()
    this.authService.logout();
    location.replace('/');
  }

  updateProfile() {
    var params = {
      name : this.profileNewInfo.name,
      phone : this.profileNewInfo.phone
    }
    this.api.post(environment.getUrl('update-bio'), JSON.stringify(params))
      .map(res => res)
      .subscribe(
        response => {
          this.appState.getUserProfile();
          this.messageService.showSuccessMessage("Information saved successfully!");
          location.replace('/');
        },
        error => {
          this.messageService.showErrorMessage("message", error);
        },
        () => { }
      );
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

  changePassword() {
    
  }

}
