
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import {event} from './event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  event: event= {
    eventName:'',
  strength: 0,
  companyId: '',
  regStartDate: new Date(),
  eventDate:new Date(),
  status: '',


  };
  constructor(private http: HttpClient) { }
  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };


  postEvent(event: event) {
    return this.http.post(environment.apiBaseUrl + '/createEvent', event,this.noAuthHeader);
  }

  getEventsForCandidate(){
    return this.http.get(environment.apiBaseUrl + '/eventForCandidate',this.noAuthHeader);

  }

  getEventStatus(status:string){
    return this.http.get(environment.apiBaseUrl + '/statusEvent?status='+status,this.noAuthHeader);

  }
  updateEventStatus(ename:string,status:string)
  {
    return this.http.put(environment.apiBaseUrl + '/updateEventStatus?ename='+ename+'&status='+status,this.noAuthHeader);

  }

  getEventByName(name:string)
  {
    return this.http.get(environment.apiBaseUrl + '/getEventByName?ename='+name,this.noAuthHeader);

  }

  getAllEvents()
  {
    return this.http.get(environment.apiBaseUrl + '/dispalyEvents');

  }

  checkEvents(ename)
  {
    return this.http.get(environment.apiBaseUrl + '/checkEvents?ename='+ename);

  }







}
