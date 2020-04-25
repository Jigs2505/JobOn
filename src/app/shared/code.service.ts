
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import {code} from './code.model';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  code: code= {
    title:'',
    eventName  :'',
    statement :'',
    marks:0,
    difficultyLevel:'',
    testcases:[],
    sampleIpOps:[],
  relatedTopics:['']



  };
  constructor(private http: HttpClient) { }
  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };


  postCode(code: code) {
    return this.http.post(environment.apiBaseUrl + '/uploadCodingQue', code,this.noAuthHeader);
  }

  getCodes(id:string){
    return this.http.get(environment.apiBaseUrl + '/showCodingQue?id='+id,this.noAuthHeader);

  }

  getCodingQueByTitle(title:string){
    return this.http.get(environment.apiBaseUrl + '/getCodingQueByTitle?title='+title,this.noAuthHeader);

  }



}
