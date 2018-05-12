import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';
import { APIService } from '../../auth/APIService';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message-service/message.service';
import { environment } from '../../../environments/environment';
declare var $: any;

export interface Slider {
  "product_id": string,
  "sub_title": string
  "name": string,
  "url": string,
  "_id": string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  constructor(
    public appState: AppStateService,
    public api: APIService,
    public router: Router,
    public route: ActivatedRoute,
    public messageService: MessageService
  ) { }


  public arr = [1]

  public slides: Slider[];
  public allGameInfo = [];
  public promotionGame = [];
  public hotGame = []
  public newGames = []


  ngOnInit() {
    this.getConfigInfo()

  }

  getConfigInfo() {
    var controller = this;
    this.api.put(environment.getUrl('getConfig'))
      .map(res => res.json())
      .subscribe(
        res => {
          controller.allGameInfo = res.products;
          controller.slides = res.config.slides;
          controller.initSlide();
          
          controller.newGames = controller.filterGameFromIDs(res.config.new_game_ids)
          controller.promotionGame = controller.filterGameFromIDs(res.config.promotion_game_ids)
          controller.hotGame = controller.filterGameFromIDs(res.config.hot_game_ids)
          
        },
        err => {
          this.messageService.createErrorMessage("", "Can't get config info");
        }
      )

  }

  initSlide() {
    setTimeout(() => {
      $('#slider').nivoSlider({
        effect: 'boxRandom',
        controlNavThumbs: false,
        pauseOnHover: true,
        animSpeed: 1000,
        pauseTime: 5000,
      });

    }, 2000);

  }

  filterGameFromIDs(gameIds : [any]){
    return this.allGameInfo.filter( (game) => gameIds.indexOf(game._id) != -1)
  }

  getPropertyGameInfoById(id: string, key: string) {
    var object = this.allGameInfo.find(t => t.product_id == id)
    return object ? object[key] : null
  }

  getImageUrl(url) {
    var endPoint = environment.imageUrl
    return endPoint + url
}



}
