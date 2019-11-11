import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json'
  })
};

@Injectable()
export class UserService {

  baseUrl : string;

  constructor(private httpClient : HttpClient) {
    this.baseUrl  = 'http://localhost:8240/user';
   }

  validateUser(username, password):Observable<any>{ 
    return this.httpClient.get(this.baseUrl+'/validate'+'/'+username+'/'+password);
  }

  addUser(user):Observable<any>{
    let body = JSON.stringify(user);
    return this.httpClient.post(this.baseUrl+'/add', body, httpOptions);
  }

}
