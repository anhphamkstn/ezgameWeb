import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Game } from '../../models/game.model';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseService } from '../../services/purchase.service';
import { APIService } from '../../authenticate/api.service';
import { Auth } from '../../authenticate/auth.service';

export class State {
    constructor(public name: string, public population: string, public flag: string) { }
}

@Component({
    selector: 'main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ["./main-layout.component.css"]
})

export class MainLayoutComponent implements OnInit , AfterViewInit {

    public searchCtrl: FormControl;
    filteredGames: Observable<any[]>;

    public isLogined = false;
    constructor(
        public authService: Auth,
        public api: APIService,
        public appState: AppStateService,
        public router: Router,
        public purchaseSerive : PurchaseService,
        public route: ActivatedRoute,
    ) {
        this.isLogined = (this.authService.isValidAuthentication() && this.authService.loggedIn)
        if (this.isLogined) {
            this.appState.getUserProfile();
            this.purchaseSerive.getCart();
        }
            
        this.searchCtrl = new FormControl();
        this.filteredGames = this.searchCtrl.valueChanges
            .pipe(
                startWith(''),
                map(name => name ? this.filterGames(name) : [])
            );

    }
    ngOnInit() {
        this.isLogined = (this.authService.isValidAuthentication() && this.authService.loggedIn)
    }

    ngAfterViewInit() {
    
    }

    getImageUrl(url) {
        var endPoint = environment.imageUrl
        return endPoint + url
    }


    public result;

    filterGames(name: string) {
        var param = new URLSearchParams();
        param.set('keyword', name)
        var controller = this;
        this.api.get(environment.getUrl('search') + "?keyword=" + name)
            .map(res => res.json())
            .subscribe(
                response => {
                    controller.result = response

                })
        return controller.result
    }

    

    selectGame(event: MatAutocompleteSelectedEvent) {
        this.router.navigate(['/product/' + event.option.value]);
    }


}