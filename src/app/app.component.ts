  
  import { Component } from '@angular/core';
  import {NgForm} from '@angular/forms'
  import { UserdataService } from './userdata.service';
  import { Injectable } from '@angular/core';
  import { catchError } from 'rxjs/operators';
  import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userData:any = [];
  user={
  firstName:'',
  lastName:'',
  age:'',
  email:''
  }
  constructor(private httpclient:UserdataService){}
    ngOnInit(): void 
    {
      this.userdatalist();
    
  }

  
  title = 'Click Here New User Registaration';
  
  VisibleButton = false;  
  isShowTableIf=false; 
  ShowButton() {  
    this.VisibleButton = !this.VisibleButton;  
  }  


  userdatalist(){
    this.httpclient.list().subscribe((response)=>{
      this.userData = response;
    },(error=>{

    }));
  }
  RigisterUser(){
  
  //  this.isShowTableIf = !this.isShowTableIf;  
    let userDataFromUI = {
    }
    this.httpclient.create(this.user).subscribe((response)=>{
      this.userdatalist();
    },(error=>{

    }));
  }
}
