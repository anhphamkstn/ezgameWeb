import { Component, OnInit } from '@angular/core';
import { APIService } from '../../authenticate/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {

  constructor(
    public api: APIService
  ) { }

  public orders = []

  ngOnInit() {
    this.api.get(environment.getUrl('account-order'))
      .map(res => res.json()).subscribe(
      response => {
        this.orders = response
      },
      error => {

      },
      () => { }
      );
  }

  getOrderID(order) {
    var a = new Date(order.created).getTime()
    return a
  }

  getTotal(order) {
    var total = 0;
    order.products.forEach(p => {
      total += p.price * p.qty
    });
    return total
  }

}
