import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, AfterViewInit {

  constructor(
    public purchaseSerive: PurchaseService,
  ) { }

  public banks = [
    {
      bank: "vcb",
      user: "Hà Thanh Thiện",
      number: "0021000419305",
      chiNhanh: "Hoàn Kiếm",
      url: 'assets/default/images/bank/vcb.jpg'
    }
    ,
    {
      bank: "techcombank",
      user: "Hà Thanh Thiện",
      number: "190031905822229",
      chiNhanh: "Hoàn Kiếm",
      url : 'assets/default/images/bank/techcombank.jpg'
    }
    ,
    {
      bank: "acb",
      user: "Hà Thanh Thiện",
      number: "249612169",
      chiNhanh: "Hoàn Kiếm",
      url : 'assets/default/images/bank/acb.jpg'
    },
    {
      bank: "Agribank",
      user: "Hà Thanh Thiện",
      number: "1502205210335",
      chiNhanh: "Hoàn Kiếm",
      url: 'assets/default/images/bank/agribank.jpg'
    },
    {
      bank: "vietinbank",
      user: "Nghiêm Tuấn Anh",
      number: "105866765359",
      chiNhanh: "Sở giao dịch Hà Nội",
      url : 'assets/default/images/bank/vietinbank.jpg'
    },
    {
      bank: "bidv",
      user: "Nghiêm Tuấn Anh",
      number: "12210001896635",
      chiNhanh: "Sở giao dịch Hà Nội",
      url : 'assets/default/images/bank/bidv.jpg'

    }
  ]

  public total = 0;
  public selectBank: any;

  public defaultBank = {
    bank: "Agribank",
    user: "Hà Thanh Thiện",
    number: "1502205210335",
    chiNhanh: "Hoàn Kiếm"
  }

  ngOnInit() {
    this.selectBank = this.defaultBank
    
  }

  ngAfterViewInit() {
    this.purchaseSerive.cart.products.forEach(e => {
      this.total += e.price
    });
  }

  selectBankByName(bank) {
    this.selectBank = bank
  }

}
