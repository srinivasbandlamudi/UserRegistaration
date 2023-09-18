import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

apiurl="https://localhost:7274/UserRegistration/GetAllUsers";
insertapi="https://localhost:7274/UserRegistration/InsertUser" ;
Updateapi="https://localhost:7274/UserRegistration/UpdateUser" ;
Deleteapi="https://localhost:7274/UserRegistration/DeleteUser" ;

constructor(private _http:HttpClient){}

getdata(){
  return this._http.get(this.apiurl);
}

postdata(user:any){
  return this._http.post(this.insertapi, user)
}

update(id:any, user:any){
user.id=id;
  return this._http.put(this.Updateapi, user)
}

delete(user:any){
  const id:number=user;
 console.log(user);
  return this._http.post(this.Deleteapi+'/'+id,"")
}
  
}
