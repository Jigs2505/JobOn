
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import {queset} from './queset.model';

@Injectable({
  providedIn: 'root'
})
export class QueSetService {

  queset: queset= {
    eventName  :''
  };
  constructor(private http: HttpClient) { }
  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };


  postqueset(queset: queset) {
    return this.http.post(environment.apiBaseUrl + '/uploadQueSet', queset,this.noAuthHeader);
  }

  getqueset(id:string){
    return this.http.get(environment.apiBaseUrl + '/showQueSet?id='+id,this.noAuthHeader);
  }

  findQueset(eventName:string){
    return this.http.get(environment.apiBaseUrl + '/getQueSet?eventName='+eventName,this.noAuthHeader);
  }



}
