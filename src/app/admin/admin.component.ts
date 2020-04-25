import { Component, OnInit } from '@angular/core';
import {EventService} from '../shared/event.service';
import { CompanyService } from '../shared/company.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  pandingEvents;
  pandingEventsToShow=[];
  companyDetails;
  id;
  msg;
  userDetails;

  constructor(private eventService:EventService,private companyService:CompanyService, private router:Router ) { }

  ngOnInit() {
    this.userDetails=JSON.parse(localStorage.getItem('user'));

    console.log(this.userDetails)
    this.eventService.getEventStatus('PANDING').subscribe(
      res => {
        this.pandingEvents=res['events'];
        this.pandingEvents.forEach(element => {
          this.companyService.getCompanyProfileFromId(element.companyId).subscribe(
            res => {
              this.companyDetails = res['companys'];
              const temp=this.pandingEventsToShow;
              temp.push({
                'eventDetails':[element],
                'companyDetails':this.companyDetails
              })
              this.pandingEventsToShow=temp

              console.log(this.companyDetails);
              console.log(this.pandingEventsToShow)
            },
            err => {
              console.log(err);

            }
          );
        });
        console.log(this.pandingEvents);
        if(this.pandingEvents.length == 0){
          this.msg='There is no panding events';
        }
      },
      err => {
        console.log(err);

      }
    );
  }
  Accept(ename:string){

    var status='ACK'
    this.eventService.updateEventStatus(ename,status).subscribe(
      res => {
      this.companyDetails = res['events'];
      console.log(this.companyDetails);
      },
      err => {
        console.log(err);

      }
    );
window.alert('Event accepted!!')
  }
  Reject(ename:string){

    var status='REJECT';
    this.eventService.updateEventStatus(ename,status).subscribe(
      res => {
      this.companyDetails = res['events'];
      console.log(this.companyDetails);
      },
      err => {
        console.log(err);

      }
    );
    window.alert('Event rejected!!')
  }

  onLogout() {
    this.companyService.deleteToken();
    this.router.navigate(['/home']);
  }
}
