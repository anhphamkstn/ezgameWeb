import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from '../../auth/APIService';
import { AppStateService } from '../../services/app-state.service';
import { MessageService } from '../../services/message-service/message.service';
import { environment } from '../../../environments/environment';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public productID
  public gameInfo = new Game;
  constructor(
    public appState: AppStateService,
    public api: APIService,
    public router: Router,
    public route: ActivatedRoute,
    public messageService: MessageService,

  ) {
    this.productID = this.route.params["value"].id
  }

  ngOnInit() {
    this.getProductInfo()
  }

  getProductInfo() {
    var controller = this
    this.api.get(environment.getUrl('getProduct') + "/" + this.productID)
      .map(res => res.json())
      .subscribe(
        res => {
          controller.gameInfo = res
        },
        err => {
          this.messageService.createErrorMessage("", "Can't get product info");
        }
      )

  }



}
