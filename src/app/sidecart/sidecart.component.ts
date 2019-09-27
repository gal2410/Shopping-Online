import {Component, OnInit, Input, Output, EventEmitter,Inject} from '@angular/core';
import {CartService} from '../cart.service';
import {FormSubmitService} from '../form-submit.service';
import {OpenDialogService} from '../open-dialog.service';
import {SessionsService} from '../sessions.service';
import { DOCUMENT } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-sidecart',
  templateUrl: './sidecart.component.html',
  styleUrls: ['./sidecart.component.css']
})
export class SidecartComponent implements OnInit {
  list = this.showCart();
  searchedTerm;
  user: object={};
  public show:boolean = true;
  public buttonName:any = 'Hide';
  cart: any = [];
  quantity: number;
  color = 'Primary';
  mode = 'query';
  style = false;
  cartName = "View Cart";
  fetching: boolean = false;
  session: boolean = false;
  @Input() pageName;
  @Output() isCartEmpty: EventEmitter<any> = new EventEmitter();
  
  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,

    private _sessionsService: SessionsService,
    private _openDialogService: OpenDialogService,
    private _cartService: CartService,
    private _formSubmitService: FormSubmitService) {

    this.fetching = true;
    this._cartService.getItems().subscribe(res =>{
      this._cartService.cart = res;
      this.showCart();
      if(this.cart.length == 0){
        this.isCartEmpty.emit(true);
      }
      this.fetching = false;
    });

     _formSubmitService.getSession.subscribe(value=>{

        this.fetching = true;
        this._cartService.getItems().subscribe(res =>{
          this._cartService.cart = res;
          this.showCart();
          if(this.cart.length == 0){
            this.isCartEmpty.emit(true);
          }
          this.fetching = false;
        });

      });
  }


  ngOnInit() {
    this.checkSession();
    this.list
   
  }
 

  private changeUser(value){
    this.user = value;
  }
  checkSession(){
    this._sessionsService.checkSession().subscribe(res=>{
      this.changeSession(res.data);
      this.changeUser(res.user);
    });
  }

  showCart():any{
    this.cart =  this._cartService.returnItems();

  }

  
  incQuantity(i): void{
    this.cart[i].quantity++;
    this._cartService.updateItems(this.cart).subscribe(res=>{
      console.log(res);
    });
  }

  decQuantity(i): void{
    if(this.cart[i].quantity > 1){
      this.cart[i].quantity--;
      this._cartService.updateItems(this.cart).subscribe(res=>{
      console.log(res);
    });

    }
  }

  removeItem(i):void{
    this.cart.splice(i, 1);
    if(this.cart.length == 0){
      this.isCartEmpty.emit(true);
    }
    this._cartService.updateItems(this.cart).subscribe(res=>{
      console.log(res);
    });
  }

  removeAllItems():void{
    this.cart.splice(0,);
    if(this.cart.length == 0){
      this.isCartEmpty.emit(true);
    }
    this._cartService.updateItems(this.cart).subscribe(res=>{
      console.log(res);
    });
  }

  totalItemPrice(price:number, quantity:number): number{
    return price * quantity;
  }

  totalAmount():number{

    const len = this.cart.length;
    var amt = 0;
    for(var i=0; i<len; i++){
      amt += (this.cart[i]['quantity'] * this.cart[i]['price']);
    }
    return amt;
  }

  totalItems():number{
    const len = this.cart.length;
    var items =0;
    for(var i=0; i<len; i++){
      items += this.cart[i].quantity;
    }
    return items
  }

  changeSession(value){
    this.session = value;
  }

  display(){
    this.style = this.style == true?false:true;
    this.cartName = this.style == true?"Hide Cart":"View Cart";
  }


}
