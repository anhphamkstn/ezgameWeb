import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  constructor(
    public purchaseSerive : PurchaseService,
  ) { }

  public total = 0;

  ngOnInit() {
    console.log(this.purchaseSerive.cart)
    this.purchaseSerive.cart.products.forEach(e => {
      this.total += e.price 
      
    });
  }

}
