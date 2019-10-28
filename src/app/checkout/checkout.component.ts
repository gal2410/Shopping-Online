import { Component, OnInit, Inject } from '@angular/core';
import { OpenDialogService } from '../open-dialog.service';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { FormSubmitService } from '../form-submit.service';
import { SessionsService } from '../sessions.service';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { CartService } from '../cart.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, of } from "rxjs";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  message: string;
  waffles: any;
  fetching: Boolean = false;
  LoginForm: any;
  session: boolean = false;
  issetLocation: boolean = false;
  selectedLocation: any;
  user: any = {};
  locations = [];
  pageName = "checkout";
  isCartEmpty: boolean = false;
  orders: any = [];
  input
  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }

  dynamicDownloadTxt() {
    this._cartService.orders(this.LoginForm.value).subscribe((res) => {
      this.dyanmicDownloadByHtmlTag({
        fileName: 'My Report',
        text: JSON.stringify(res.totalPrice)
      });
    });

  }

  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }



  myFunction(val) {
    this.input = document.getElementById("e");
    this.input.value = val;
  }



  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private sanitizer: DomSanitizer,
    private _openDialogService: OpenDialogService,
    private _sessionsService: SessionsService,
    private _formSubmitService: FormSubmitService,
    private _cartService: CartService,
    public dialog: MatDialog,
  ) {
    _formSubmitService.getSession.subscribe(value => {
      this.changeSession(value);
    });
    _formSubmitService.getUser.subscribe(value => {
      this.changeUser(value);
    });
    this._formSubmitService.getAddress.subscribe(value => {
      console.log(value);
      console.log(this.locations);
      this.locations.push(value);
    });
  }



  ngOnInit() {
    this.checkSession();

    if (this.selectedLocation) {
      this.issetLocation = true;
    };
    this.LoginForm = new FormGroup({
      city: new FormControl('', [
        Validators.required
      ]),
      street: new FormControl('', [
        Validators.required
      ]),
      Shipping_Date: new FormControl('', [
        Validators.required
      ]),
      Credit_Card: new FormControl('', [
        Validators.required
      ]),
    })
  }
  get city() { return this.LoginForm.get('city'); }
  get street() { return this.LoginForm.get('street'); }
  get Shipping_Date() { return this.LoginForm.get('Shipping_Date'); }
  get Credit_Card() { return this.LoginForm.get('Credit_Card'); }

  oorders(): void {
    this._cartService.orders(this.LoginForm.value).subscribe(res => {
      console.log(res)
  
      if (res.Credit_Card > 1) {
        this.open()
      }  else{
        this.message = res.message;
      }
    })
  }

  openLoginDialog(): void {
    this._openDialogService.openDialog(LoginComponent);
  }
  openSignupDialog(): void {
    this._openDialogService.openDialog(SignupComponent);
  }

  private changeSession(value): void {
    this.session = value;
  }
  changeAddressSession(value): void {
    this.issetLocation = value;
  }
  private changeAddress(value): void {
    this.selectedLocation = value;
  }
  private changeUser(value) {
    this.user = value;
    // this.locations = value.address;
  }

  checkSession() {
    this._sessionsService.checkSession().subscribe(res => {
      this.changeSession(res.data);
      this.changeAddressSession(res.add);
      if (res.data == true) {
        this.changeUser(res.user);
      }
      if (res.add == true) {
        this.changeAddress(res.address);
      }
    });
  }

  give_address(value): string {
    return value.flatNo + ", " + value.body + ", " + value.pincode;
  }

  set_location(value): void {
    this.selectedLocation = value;
    this.issetLocation = true;
    this._formSubmitService.addAddress(value).subscribe(res => {
      console.log(res);
    });
  }

  cartLenghtHandler(value) {
    this.isCartEmpty = value;
  }

  removeAddress(i): void {
    this.locations.splice(i, 1);
  }

  open() {
    this.dialog.open(popComponent)
  }
}

@Component({
  selector: 'POP',
  templateUrl: 'pop.component.html',
  styleUrls: ['./checkout.component.css']
})

export class popComponent {

  fileUrl;
  LoginForm: any;
  r = []
  constructor(public dialogRef: MatDialogRef<popComponent>,
    private sanitizer: DomSanitizer,


    private http: HttpClient,

    private _cartService: CartService,
    public dialog: MatDialog,

  ) {
  }

  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }

  dynamicDownloadTxt() {
    this._cartService.getItems().subscribe((res) => {
      const products = res.map(p => p.title);
      const product = res.map(p => p.price);
      this.r = products + ['   total price:'] + product.reduce((a, b) => a + b, 0)
      this.dyanmicDownloadByHtmlTag({
        fileName: 'My Report',
        text: JSON.stringify(this.r),
      });
    });
  }

  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string,

  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);

    element.setAttribute('download', arg.fileName);
    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }

  ngOnInit() {


  }
}



