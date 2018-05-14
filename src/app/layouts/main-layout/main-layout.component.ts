import { Component, OnInit } from '@angular/core';
import { Auth } from '../../auth/auth';
import { AppStateService } from '../../services/app-state.service';

@Component({
    selector: 'main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ["./main-layout.component.css"]
})

export class MainLayoutComponent implements OnInit {
    public isLogined = false;
    constructor(
        private authService: Auth,
        public appState: AppStateService,
    ) {
        this.isLogined = (this.authService.isValidAuthentication() && this.authService.loggedIn)
        this.appState.getUserProfile();
        
    }
        ngOnInit() {
            this.isLogined = (this.authService.isValidAuthentication() && this.authService.loggedIn)
        }
    }