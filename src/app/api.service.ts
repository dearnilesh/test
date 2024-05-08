import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
   apiUrl:string= "https://jsonplaceholder.typicode.com/users";
   newApi:string ="http://localhost:3000/users"
   constructor(private http: HttpClient) { }
   getData() {
     return this.http.get(this.apiUrl)
    }
    newdataPost(data:any){
      return this.http.post(this.newApi,data)
    }
    newdataGet(){
      return this.http.get(this.newApi)
    }
  }