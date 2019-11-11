import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json'
  })
};

@Injectable()
export class CompaniesService {

  baseUrl : string;

  constructor(private httpClient : HttpClient) { 
    this.baseUrl  = 'http://localhost:8240/company';
  }

  getAllCompanies():Observable<any>{ 
    return this.httpClient.get(this.baseUrl+'/list');
  }

  saveCompany(company):Observable<any>{
    let body = JSON.stringify(company);
    return this.httpClient.post(this.baseUrl+'/add', body, httpOptions);
  }

  updateCompany(company, id):Observable<any>{
    let body = JSON.stringify(company);
    return this.httpClient.post(this.baseUrl+'/update'+'/'+id, body, httpOptions);
  }

  getCompanyById(id):Observable<any>{ 
    return this.httpClient.get(this.baseUrl+'/company/'+id);
  }

  getCompanyEmployeesById(id):Observable<any>{ 
    return this.httpClient.get(this.baseUrl+'/company/'+id+'/employee');
  }

  saveCompanyEmployee(companyid,employee):Observable<any>{
    let body = JSON.stringify(employee);
    return this.httpClient.post(this.baseUrl+'/addemployee/'+companyid, body, httpOptions);
  }

  getCompanyEmployeeById(companyid, empid):Observable<any>{ 
    return this.httpClient.get(this.baseUrl+'/company/'+companyid+'/'+empid);
  }

  updateCompanyEmployee(companyid,empid,employee):Observable<any>{
    let body = JSON.stringify(employee);
    return this.httpClient.put(this.baseUrl+'/updateemployee/'+companyid+"/"+empid, body, httpOptions);
  }

}
