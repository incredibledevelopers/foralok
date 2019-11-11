import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class ConceptService {

  baseUrl: string;
  loadConceptCmp = new Subject<string>();

  setLoadConceptCmp(message: string) {
    this.loadConceptCmp.next(message);
  }

  getLoadConceptCmp(): Observable<any> {
    return this.loadConceptCmp.asObservable();
  }

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:8240/concept';
  }

  getAllConcepts(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/list');
  }

  getConceptsByUsername(username): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/concepts/' + username);
  }

  saveConcept(concept): Observable<any> {
    let body = JSON.stringify(concept);
    return this.httpClient.post(this.baseUrl + '/add', body, httpOptions);
  }

  getConceptById(id): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/concept/' + id);
  }

  updateConcept(id, concept): Observable<any> {
    let body = JSON.stringify(concept);
    return this.httpClient.put(this.baseUrl + '/update/' + id, body, httpOptions);
  }

  getConceptByStatus(option, param): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/list/' + option + "/" + param);
  }

}
