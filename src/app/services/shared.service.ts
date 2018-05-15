import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { environment } from "../../environments/environment";


declare var jQuery: any;
declare var moment: any;

@Injectable()
export class SharedService {
    today: Date;

    constructor() {
        this.today = new Date();
    }

    formatNumber(str) {
        if(str) {
            return Number(str).toLocaleString('en-US')
        } else {
            return '0'
        }
    }
}
