import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import {EventService} from '../shared/event.service';
import {RegEventService} from '../shared/regEvent.service';
import {regEvent} from '../shared/regEvent.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  Events;
  l:string="none";
  constructor(private userService: UserService,private eventService:EventService,private regEventService:RegEventService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {

        this.userDetails = res["users"];
        localStorage.setItem('user', JSON.stringify(this.userDetails));
        if(this.userDetails.fullName == "Admin")
        {
          this.router.navigate(['/admin']);
        }
      },
      err => {
        console.log(err);

      }
    );
    this.eventService.getEventsForCandidate().subscribe(
      res => {
        console.log(res['events'])
        this.Events = res['events'];
      },
      err => {
        console.log(err);

      }
    );


  }

  edit(){

  }

  registerForEvent(eName:string)
  {
    console.log(this.userDetails.fullName);
    const regEvent: regEvent = {
    eventName:eName,
    userName: this.userDetails.fullName,
    total: 0,
    result:0,
    QOSRating: 0,
    jobOnRating:0
    };
    this.regEventService.checkCompany(eName,this.userDetails.fullName).subscribe(
      res => {

        console.log("Checking for privious registration ");
        console.log(res["status"])
        if(res["status"]== 'false')
        {
          window.alert("You Have Alrady Register For This Event!!!");
          this.router.navigateByUrl('/viewTest/'+eName);

        }
        else{
            console.log("in else opart")
            window.alert("regForEvent success");
            this.regEventService.postEvent(regEvent).subscribe(
              res => {

              },
              err => {
                console.log(err);

              }
            );


          }
      },
      err => {
        console.log(err);


      }
    );

  }
  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/home']);
  }

}
