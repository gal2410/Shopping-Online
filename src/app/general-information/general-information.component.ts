import { Component, OnInit ,Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/platform-browser';
import {FormSubmitService} from '../form-submit.service';
import {SessionsService} from '../sessions.service';
import {CartService} from '../cart.service';


@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.css']
})
export class GeneralInformationComponent implements OnInit {
  Products: any;
  Orders:any;
  order: any;
  open_cart: any;
  user: object={};
  session: boolean = false;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private _formSubmitService: FormSubmitService,
    private _sessionsService: SessionsService,
    private _cartService: CartService,



    ) {
      _formSubmitService.getSession.subscribe(value=>{
        this.changeSession(value);
      });
      _formSubmitService.getUser.subscribe(value=>{
        this.user = value
      });

      
    }
    changeSession(value){
      this.session = value;
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
  ngOnInit() {
    this.checkSession();
    this.AllProducts();
    this.AllOrders();
    this.getOrder();
    this.getopencart();
  }
  AllProducts(): void {
    this.http.get('http://' + this.document.location.hostname + ':3000/api/AllProducts').subscribe((res: any) => {
      this.Products = res;
    });
  }

  AllOrders(): void {
    this.http.get('http://' + this.document.location.hostname + ':3000/api/AllOrders').subscribe((res: any) => {
      this.Orders = res;
    });
  }


  getOrder(): void {
    this.http.get('http://'+this.document.location.hostname+':3000/api/lastOrder').subscribe((res: any) => {
        this.order = res;
        console.log(res)
        
    });
  }

  
  getopencart(): void {
    this.http.get('http://'+this.document.location.hostname+':3000/api/opencart').subscribe((res: any) => {
        this.open_cart = res;
        console.log(res)
    });
  }

  }

