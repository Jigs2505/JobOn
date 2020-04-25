import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../shared/company.service';
import { Router } from '@angular/router';
import {EventService} from '../shared/event.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  companyDetails;
  pandingEvents;
  rejectEvents;
  rejectEventsToShow=[];
  pandingEventsToShow=[];
  QsetUploadingPandingEvent=[];
  msgReject='';
  msgPending='';
  constructor(private companyService: CompanyService, private router: Router,private eventService:EventService) { }

  ngOnInit() {
    this.companyService.getCompanyProfile().subscribe(
      res => {
        this.companyDetails = res['companys'];
        localStorage.setItem('cmpid',this.companyDetails._id);
        console.log(localStorage.getItem('cmpid').toString())
        console.log(this.companyDetails);
      },
      err => {
        console.log(err);

      }
    );

    this.eventService.getEventStatus('ACK').subscribe(
      res => {
        this.pandingEvents=res['events'];
        this.pandingEvents.forEach(e=>{
         if( e.companyId ==this.companyDetails._id.toString() ){
            const temp=this.QsetUploadingPandingEvent
            temp.push(e);
         }
        });
        console.log(this.QsetUploadingPandingEvent)
        if(this.QsetUploadingPandingEvent.length == 0)
        {
          this.msgPending='No Panding events yet';
        }
        console.log(this.pandingEvents);
      },
      err => {
        console.log(err);

      }
    );



    this.eventService.getEventStatus('REJECT').subscribe(
      res => {
        this.rejectEvents=res['events'];
        this.rejectEvents.forEach(e=>{
         if( e.companyId ==this.companyDetails._id.toString() ){
            const temp=this.rejectEventsToShow
            temp.push(e);
            this.rejectEventsToShow =temp
         }
        });
        console.log(this.rejectEventsToShow)
        this.msgReject='No Panding events yet';
        console.log(this.rejectEvents);
      },
      err => {
        console.log(err);

      }
    );


  }

  onLogout() {
    this.companyService.deleteToken();
    this.router.navigate(['/home']);
  }
  UploadQset(eventname:string){
    this.router.navigate(['/PostQuestions/'+eventname]);

  }

}
