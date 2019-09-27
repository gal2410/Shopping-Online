import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {OpenDialogService} from '../open-dialog.service';
import {LoginComponent} from '../login/login.component';
import {SessionsService} from '../sessions.service';
import {FormSubmitService} from '../form-submit.service';
import { DOCUMENT } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() pageName;

  waffles: any;
  fetching: Boolean = false;
  session: boolean = false;
  user: object={};
  constructor(
    private _openDialogService: OpenDialogService,
    private _sessionsService: SessionsService,
    private _formSubmitService: FormSubmitService,
    @Inject(DOCUMENT) private document: Document,

    private http: HttpClient,

  ) {
    _formSubmitService.getSession.subscribe(value=>{
      this.changeSession(value);
    });
    _formSubmitService.getUser.subscribe(value=>{
      this.user = value
    });
  }

  ngOnInit() {
    this.checkSession();
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

  logout(){
    this._formSubmitService.logout().subscribe(res=>{
      if(res.status == 1){
        this._formSubmitService.getSession.emit(false);
      }
    })
  }

}
