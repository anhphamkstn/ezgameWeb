import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { environment } from "../../environments/environment";
import { Game } from '../models/game.model';
import { Cart } from '../models/cart.model';
import { AppStateService } from './app-state.service';
import { MessageService } from './message-service/message.service';
import { APIService } from '../authenticate/api.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';


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
    public orderID = 1;

    constructor(
        public api: APIService,
        public messageService: MessageService,
        public appState: AppStateService,
        public router: Router,
        public location: Location
    ) {

    }

    public deleteCart() {
        this.api.delete(environment.getUrl('cart') + "/" + this.cart._id)
                .map(res => res)
                .subscribe(
                response => {
                    this.messageService.showSuccessMessage("Xóa giỏ hàng thành công.")
                    delete this.cart
                },
                error => {

                },
                () => { }
                );
    }

    public getCountCart() {
        var sum =0
        if (this.cart) this.cart.products.forEach(e => {
            sum += e.qty
        }); 
        return sum
    }

    public updateCart() {
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


    public addProductToCart(product: Game) {
        if (!product) {
            this.messageService.showErrMessage("Game này không có sẵn")
            return
        }
        product.qty = 1;
        if (this.cart) {
          
            this.cart.products.push(product)
            this.updateCart();

        }

        else this.createShoppingCart([product])
    }

    public getCartData() {
        if (!this.appState.user_profile._id) {
            this.api.get(environment.getUrl('getProfileUrl')).map(res => res.json()).subscribe(
                response => {
                    this.appState.user_profile = response;
                    return this.api.get(environment.getUrl('cart') + "/" + this.appState.user_profile._id)
                        .map(res => res.json()).subscribe(
                        response => {
                            this.cart = response
                            if (this.cart)
                                this.orderID = new Date(this.cart.created).getTime()
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

    public checkOutBank() {
        var controller = this
        this.cart.payment_method = 2
        this.api.post(environment.getUrl('cartBank') + "/" + this.cart._id, JSON.stringify(this.cart))
            .map(res => res)
            .subscribe(
            response => {
                controller.messageService.showSuccessMessage("Thanh toán thành công")
                controller.router.navigate(['#'])
            },
            error => {

            },
            () => { }
            );
        controller.messageService.showSuccessMessage("Thanh toán thành công")
        controller.router.navigate(['#'])
    }



    public checkOutBaoKim() {
        this.cart.payment_method = 2
        this.api.post(environment.getUrl('cartBaoKim') + "/" + this.cart._id, JSON.stringify(this.cart))
            .map(res => res.json())
            .subscribe(
            response => {
                window.location.href = response.url
            },
            error => {

            },
            () => { }
            );

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
                            if (this.cart)
                                this.orderID = new Date(this.cart.created).getTime()
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
        this.orderID = params.created
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

@Injectable()
export class CartResolver implements Resolve<Cart> {
    constructor(private appState: PurchaseService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return this.appState.getCartData()
    }
}

