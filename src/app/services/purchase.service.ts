import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { environment } from "../../environments/environment";
import { Game } from '../models/game.model';
import { Cart } from '../models/cart.model';
import { APIService } from '../auth/APIService';

declare var jQuery: any;
declare var moment: any;

export class Product {
    public product_id : string;
    public image : string;
    public price : string;
    public catalog_id : string
    public qty :number

}

export class CreateCartParam {
    public products : Array<any>;
    public customer_id : string;
    public origin_username ?: string;
    public status : string;
    public created : Date;
    public payment_method ?: number ;
    public use_wallet ?: number
}

@Injectable()
export class PurchaseService {
    
    public cart : Cart;

    constructor(
        public api: APIService,
    ) {
        
    }

    public createShoppingCart(products : Array<Game>) {
        var params = new CreateCartParam;
        params.products = products
          this.api.post(environment.getUrl('cart'), JSON.stringify(params))
            .map(res => res)
            .subscribe(
              response => {
                
              },
              error => {
               
              },
              () => { }
            );
    }

}
