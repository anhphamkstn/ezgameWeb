import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppStateService } from '../../services/app-state.service';
import { MessageService } from '../../services/message-service/message.service';
import { environment } from '../../../environments/environment';
import { Game } from '../../models/game.model';
import { SharedService } from '../../services/shared.service';
import { APIService } from '../../authenticate/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public productID
  public gameInfo = new Game;
  public gameInSameCatalog = new Array<Game>()

  constructor(
    public appState: AppStateService,
    public api: APIService,
    public router: Router,
    public route: ActivatedRoute,
    public messageService: MessageService,
    public sharedService: SharedService

  ) {
    this.productID = this.route.params["value"].id;
    this.route.url.subscribe(url => {
      this.productID = this.route.params["value"].id;
      this.getProductInfo()
    });
  }

  ngOnInit() {
    this.productID = this.route.params["value"].id;
    this.getProductInfo()
  }



  getProductInfo() {
    var controller = this
    this.api.get(environment.getUrl('getProduct') + "/" + this.productID)
      .map(res => res.json())
      .subscribe(
        res => {
          controller.gameInfo = res
          controller.getProductInCatalog(res.catalog_id)

        },
        err => {
          this.messageService.createErrorMessage("", "Can't get product info");
        }
      )

  }

  getProductInCatalog(catalogID: string) {
    var controller = this
    this.api.get(environment.getUrl('catalog') + "/" + catalogID)
      .map(res => res.json())
      .subscribe(
        res => {
          controller.gameInSameCatalog = res
        },
        err => {
          this.messageService.createErrorMessage("", "Can't get catalog info");
        }
      )
  }



}
