import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {OpenDialogService} from '../open-dialog.service';
import {SignupComponent} from '../signup/signup.component';
import {FormSubmitService} from '../form-submit.service';
import {SessionsService} from '../sessions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  session: boolean = false;
  user: object={};
  constructor(

    private _router:Router,
    private _openDialogService: OpenDialogService,
    private _formSubmitService: FormSubmitService,
    private _sessionsService: SessionsService
  ) { 
    _formSubmitService.getSession.subscribe(value=>{
      this.changeSession(value);
    });
    _formSubmitService.getUser.subscribe(value=>{
      this.user = value
    });
  }

  LoginForm: any;
  color = 'Primary';
  mode = 'indeterminate';
  value = 50;
  isSubmit: Boolean = false;
  message: string;

  ngOnInit() {
    this.checkSession();
    this.LoginForm = new FormGroup({
    'email' : new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    'password' : new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ])
  });
  }

  get email() { return this.LoginForm.get('email'); }
  get password() { return this.LoginForm.get('password'); }


  openSignupDialog():void{
    this._openDialogService.changeValue(1);
    this._openDialogService.closeDialog();
    this._openDialogService.openDialog(SignupComponent);
  }

  onNoClick(): void {
    this._openDialogService.closeDialog();
  }

  onSubmit():void{
    this.isSubmit = true;
    this._formSubmitService.login(this.LoginForm.value).subscribe(res =>{
      this.isSubmit = false;
      if(res.status == 0){
        this.message = res.message;
      }
      else if(res.status == 1){
        console.log(res.message);
        this._openDialogService.closeDialog();
        this._formSubmitService.getSession.emit(true);
        this._formSubmitService.getUser.emit(res.data);
      }
      else{
        this.message = "Error: Something went wrong";
      }
    });
  }

  moveToHomePage(): void {
      this._router.navigate(['/home']);

}

  openDialog():void{
    this._openDialogService.openDialog(LoginComponent);
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

}

