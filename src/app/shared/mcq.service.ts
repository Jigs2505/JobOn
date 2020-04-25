
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import {mcq} from './mcq.model';

@Injectable({
  providedIn: 'root'
})
export class McqService {

  mcq: mcq= {
    title:'',
    eventName  :'',
    statement :'',
    marks:0,
    op1 :'',
    op2:'',
    op3:'',
    op4:'',
    ans :'',
  };
  constructor(private http: HttpClient) { }
  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };


  postMcq(mcq: mcq) {
    return this.http.post(environment.apiBaseUrl + '/uploadMcqQue', mcq,this.noAuthHeader);
  }

  getMcqs(id:string){
    return this.http.get(environment.apiBaseUrl + '/showMcqQue?id='+id,this.noAuthHeader);

  }
  getMcqQueByTitle(title:string){
    return this.http.get(environment.apiBaseUrl + '/getMcqQueByTitle?title='+title,this.noAuthHeader);

  }


}
