import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable()
export class ConceptlogsService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:8240/concept';
  }

  getConceptByLog(id): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/concept/' + id + "/" + "/log");
  }

  addConceptLog(id, username, body): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/add/log/' + id + "/" + username, body, httpOptions);
  }

}
