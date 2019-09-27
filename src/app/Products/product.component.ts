import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DOCUMENT } from '@angular/platform-browser';
import { CartService } from '../cart.service';
import { FormSubmitService } from '../form-submit.service';
import { OpenDialogService } from '../open-dialog.service';
import { SessionsService } from '../sessions.service';
import { LoginComponent } from '../login/login.component';
import { NgForm } from '@angular/forms';
import { EmployeeService } from "../services/employee.service";
import { Employee } from '../services/employee';

declare var M: any;

export interface DialogData {
  image: string;
  title: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductCardComponent implements OnInit {
  // searchedTerm;
  // k = this.waffletitle()
  list = this.All()
  public show: boolean = false;

  public buttonName: any = '+';
  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "+";
    else
      this.buttonName = "+";
  }
  session: boolean = false;
  user: object = {};
  waffles: any;
  waff: any;
  color = 'Primary';
  mode = 'query';
  fetching: Boolean = false;
  @Input() pageName;
  role: string
  constructor(
    private employeeService: EmployeeService,
    private _sessionsService: SessionsService,
    private _openDialogService: OpenDialogService,
    private _formSubmitService: FormSubmitService,
    private http: HttpClient,
    public dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document,
    private _cartService: CartService) {
    // this.checkSession();

    _formSubmitService.getSession.subscribe(value => {
      this.changeSession(value);
    });
    _formSubmitService.getUser.subscribe(value => {
      this.user = value
    });
  }

  ngOnInit() {
    this.checkSession();
    this.getEmployees();
    this.list
  }
  tcode: string;
  submit() {
    return this.tcode;
  }
  data: JSON;

  waffletitle(): void {
    var url = 'http://' + this.document.location.hostname + ':3000/api/waffletitle/' + this.submit()
    this.http.get(url).subscribe((res: any) => {
      this.data = res;
    });
  }



  All(): void {
    this.fetching = true;
    this.http.get('http://' + this.document.location.hostname + ':3000/api/All').subscribe((res: any) => {
      this.waffles = res;
      this.fetching = false;
    });
  }

  fruits(): void {
    this.fetching = true;
    this.http.get('http://' + this.document.location.hostname + ':3000/api/fruits').subscribe((res: any) => {
      this.waffles = res;
      this.fetching = false;

    });
  }

  coffee(): void {
    this.fetching = true;
    this.http.get('http://' + this.document.location.hostname + ':3000/api/coffee').subscribe((res: any) => {
      this.waffles = res;
      this.fetching = false;

    });
  }

  Snacks(): void {
    this.fetching = true;
    this.http.get('http://' + this.document.location.hostname + ':3000/api/Snacks').subscribe((res: any) => {
      this.waffles = res;
      this.fetching = false;

    });
  }

  openDialog(id: any): void {

    var url = 'http://' + this.document.location.hostname + ':3000/api/waffle/' + id;
    this.http.get(url).subscribe((res: any) => {

      this.waff = res;
      const dialogRef = this.dialog.open(ShowProductComponent, {
        width: 'auto',
        minWidth: '75%',
        maxWidth: '95%',
        height: 'auto',
        maxHeight: '100%',
        data: { id: this.waff._id, image: this.waff.image, title: this.waff.title, description: this.waff.description, price: this.waff.price, info: this.waff.item }

      });


      dialogRef.afterClosed().subscribe(res => {
        if (res) {

          this._cartService.addItems(res).subscribe(res => {
            console.log(res);
          });
        }
      })
    });

  }

  changeSession(value) {
    this.session = value;
  }
  private changeUser(value) {
    this.user = value;
  }
  checkSession() {
    this._sessionsService.checkSession().subscribe(res => {
      this.changeSession(res.data);
      this.changeUser(res.user);
    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
    }
  }

  addEmployee(form?: NgForm) {
    // console.log(form.value);
    if (form.value._id) {
      this.employeeService.putEmployee(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.getEmployees();
          M.toast({ html: 'Updated Successfully' });
        });
    } else {
      this.employeeService.postEmployee(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({ html: 'Save successfully' });
          this.getEmployees();
        });
    }
  }

  getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(res => {
        this.employeeService.waffles = res as Employee[];
        // console.log(res);
      });
  }

  getfruits() {
    this.employeeService.getfruits()
      .subscribe(res => {
        this.employeeService.waffles = res as Employee[];
        // console.log(res);
      });
  }

  getcoffee() {
    this.employeeService.getcoffee()
      .subscribe(res => {
        this.employeeService.waffles = res as Employee[];
        // console.log(res);
      });
  }

  getSnacks() {
    this.employeeService.getPastries()
      .subscribe(res => {
        this.employeeService.waffles = res as Employee[];
        // console.log(res);
      });
  }

  editEmployee(waffle: Employee) {
    this.employeeService.selectedEmployee = waffle;
  }
}



@Component({
  selector: 'app-show-product',
  templateUrl: 'show-product.component.html',
  styleUrls: ['./product.component.css']
})

export class ShowProductComponent {

  quantity: number = 1;
  constructor(public dialogRef: MatDialogRef<ShowProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  incQuantity(): void {
    this.quantity++;
  }

  decQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  totalPrice(price: number, quantity: number): number {
    return price * quantity;
  }

  addToCart(): void {

    // this.cart.append();
    var cartitem = this.data;
    cartitem["quantity"] = this.quantity;
    this.dialogRef.close(cartitem);
  }


}
