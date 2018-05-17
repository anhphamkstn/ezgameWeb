import { Game } from "./game.model";

export class Cart {
    public _id : string;
    public customer_id : string;
    public created :  Date ;
    public discount : Discount;
    public products : [Game];
    public __v : any;
}

export class Discount {
    public product_ids :[string]
}

