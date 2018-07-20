import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'cartStatusPipe'})
export class CartStatusPipe implements PipeTransform {

    transform(value: number): string {
        let mapping = {
            0 : 'Đang mua hàng ',
            1 : 'Đang chờ thanh toán ',
            2 : 'Đang chờ duyệt ',
            3 : 'Thành công ',
            4 : 'Refund ',
            5 : 'Lỗi ',
            6 : 'Đang gửi game'
        };
        
        return mapping[value] ? mapping[value] : 'Lỗi';
    }

}
