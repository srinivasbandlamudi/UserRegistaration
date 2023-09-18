import { Component } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataserviceService } from 'src/app/data-service.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  userform:FormGroup|any;
  data:any;
  isedit:boolean=false;
  username:any;
  usernameShow:any;
  id:any;
 
  constructor(private _dataservice:DataserviceService, private _toast:ToastrService) {
    this.ngOnInit();
   }

  ngOnInit(): void {
   this.userform = new FormGroup({
    name:new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10)
    ]),
    email:new FormControl<string>('', [
      Validators.required,
      Validators.minLength(20)
    ]),
    phone:new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10)
    ]),
    age:new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3)
    ])
   })
   this.getdata();
  }
  addOrPut = false;
  get name() {
    return this.userform.get('name');
  }
  get email() {
    return this.userform.get('email');
  }
  get phone() {
    return this.userform.get('phone');
  }
  get age() {
    return this.userform.get('age');
  }

  update(user:any){
    console.log(this.id);
    this.usernameShow= this.userform.value.name;
    this._dataservice.update(this.id, this.userform.value).subscribe(res=>{
      this.getdata();
    })

  }
  sendata(userform:FormGroup){
    this.data.push(this.userform.value);
    this.username= this.userform.value.name;
    this._dataservice.postdata(this.userform.value).subscribe(res=>{
      this.getdata();
    })
  }

  getdata(){
    this._dataservice.getdata().subscribe(res=>{
      this.data = res;
    })
  }
  
  addmodel(){
    this.isedit=false;
    this.userform.reset();
  }

  edit(i:number, user:any){
    this.isedit=true;
    this.id=i;
    this.userform.setValue({
      name:user.name,
      email:user.email,
      phone:user.phone,
      age:user.age
    })
  
  }

  delete(index:number, user:any){
    console.log(user)
    this.id=user;
    this._dataservice.delete(user).subscribe(res=>{
      this.data.splice(index, 1);
    })
  }

  



    public showSuccess():void{
      this._toast.success('User Data Successfully Added', this.username);
    }

    public showInfo():void{
      this._toast.info('Data Has Successfully Updated', this.usernameShow)
    }

    public showError():void{
      this._toast.error('Data Has Deleted');
    }
  
}
