
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import {regEvent} from './regEvent.model';

@Injectable({
  providedIn: 'root'
})
export class RegEventService {

  selectedRegEvent: regEvent= {
    userName: '',
    eventName: '',
    total: 0,
    result: 0,
    QOSRating: 0,
    jobOnRating:0
  };
  constructor(private http: HttpClient) { }
  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };


  postEvent(regEvent: regEvent) {
    return this.http.post(environment.apiBaseUrl + '/add', regEvent,this.noAuthHeader);
  }

  getCompanyProfileFromId(id:string){
    return this.http.get(environment.apiBaseUrl + '/show?id='+ id);
  }
  checkCompany(ename:string,uname:string){
    return this.http.get(environment.apiBaseUrl + '/checking?ename='+ ename+'&uname='+uname);
  }
  updateResult(ename:string,uname:string,result){
    return this.http.put(environment.apiBaseUrl + '/updateResult?ename='+ ename+'&uname='+uname,result);
  }

  updateRating(ename:string,uname:string,QOSRating,jobOnRating){
    console.log(QOSRating)
    console.log(jobOnRating)
    return this.http.put(environment.apiBaseUrl + '/updateRating?ename='+ ename+'&uname='+uname+'&qr='+QOSRating+'&jr='+jobOnRating,'');
  }

  displayResult(ename:string){
    return this.http.get(environment.apiBaseUrl + '/displayResult?ename='+ ename);
  }
  displayEvents(){
    return this.http.get(environment.apiBaseUrl + '/eventInfo');
  }



}
