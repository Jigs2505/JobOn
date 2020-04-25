import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {EventService} from '../shared/event.service';
import { event } from '../shared/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-event',
  templateUrl: './post-event.component.html',
  styleUrls: ['./post-event.component.css']
})
export class PostEventComponent implements OnInit {
  minDate;
  maxDate;

  constructor(private eventService:EventService, public router: Router) { }
  EventName='';
  Reg_Start_Date='';
  Event_date='';
  Description='';
  Strength=0;
  date = new FormControl(new Date());
  ngOnInit() {
    const currentYear = new Date().getFullYear();
    const cuurentMonth=new Date().getMonth();
    const currentDate=new Date().getDate()+1;
    this.minDate=currentYear+"-"
    if (cuurentMonth <=9){
      this.minDate+='0'+cuurentMonth+'-'
    }
    else{
      this.minDate+=cuurentMonth+'-'

    }
    if (currentDate <=9){
      this.minDate+='0'+currentDate
    }
    else
    {
      this.minDate+=currentDate
    }



  }
  postEvent(){
    const regEvent: event = {
      eventName:this.EventName,
    strength: this.Strength,
    companyId: localStorage.getItem('cmpid').toString(),
    regStartDate:new Date(this.Reg_Start_Date),
    eventDate: new Date(this.Event_date),
    status: 'PANDING',
    };
    this.eventService.postEvent(regEvent).subscribe(
      res => {

       console.log(res);
      },
      err => {
        console.log(err);

      }
    );
    this.router.navigate(['/companyprofile']);
  }

}
