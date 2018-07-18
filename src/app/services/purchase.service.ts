import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { environment } from "../../environments/environment";
import { Game } from '../models/game.model';
import { Cart } from '../models/cart.model';
import { AppStateService } from './app-state.service';
import { MessageService } from './message-service/message.service';
import { APIService } from '../authenticate/api.service';


export class Product {
    public product_id: string;
    public image: string;
    public price: string;
    public catalog_id: string
    public qty: number

}

export class CreateCartParam {
    public products: Array<any>;
    public customer_id: string;
    public origin_username?: string;
    public status: string;
    public created: number;
    public payment_method?: number;
    public use_wallet?: number
}

@Injectable()
export class PurchaseService {

    public cart: Cart;
    public haveCart = false

    constructor(
        public api: APIService,
        public messageService: MessageService,
        public appState: AppStateService
    ) {

    }

    public addProductToCart(product: Game) {
        if (this.cart) {
            this.cart.products.push(product)
            this.api.put(environment.getUrl('cart') + "/" + this.cart._id, JSON.stringify(this.cart))
                .map(res => res)
                .subscribe(
                    response => {
                        this.messageService.showSuccessMessage("Cập nhật giỏ hàng thành công.")
                        this.getCart()
                    },
                    error => {

                    },
                    () => { }
                );

        }

        else this.createShoppingCart([product])
    }

    public getCart() {
        if (!this.appState.user_profile._id) {
            this.api.get(environment.getUrl('getProfileUrl')).map(res => res.json()).subscribe(
                response => {
                    this.appState.user_profile = response;
                    this.api.get(environment.getUrl('cart') + "/" + this.appState.user_profile._id)
                        .map(res => res.json())
                        .subscribe(
                            response => {
                                this.cart = response
                            },
                            error => {

                            },
                            () => { }
                        );
                },
                error => {

                },
                () => {
                }
            );
        }
    }

    public createShoppingCart(products: Array<Game>) {
        var params = new CreateCartParam;
        params.products = products
        params.created = new Date().getTime()
        params.customer_id = this.appState.user_profile._id
        this.api.post(environment.getUrl('cart'), JSON.stringify(params))
            .map(res => res.json())
            .subscribe(
                response => {
                    this.messageService.showSuccessMessage("Tạo đơn hàng thành công.")
                    this.cart = response
                },
                error => {

                },
                () => { }
            );
    }

}
