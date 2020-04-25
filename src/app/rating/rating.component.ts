import { Component, OnInit } from '@angular/core';
import {RegEventService} from '../shared/regEvent.service';
import {regEvent} from '../shared/regEvent.model';
import { MatTabChangeEvent } from '@angular/material';
import {Router} from  "@angular/router";


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
QOSRating:number;
jobOnRating:number;
  constructor(private regEventService:RegEventService,private router:Router) { }

  ngOnInit() {
  }
  submitRating(){

    const temp:regEvent={
      eventName : 'newevent12',
      userName : 'xyz',
      QOSRating:this.QOSRating,
      jobOnRating:this.jobOnRating,
      result:0,
      total:0

    }
    let ename = 'newevent12';
    let uname = 'xyz';
    console.log(this.QOSRating)
    console.log(this.jobOnRating)
    this.regEventService.updateRating(ename, uname, this.QOSRating,this.jobOnRating).subscribe(
      res => {
        console.log(res['regForEvents']);
      },
      err => {
        console.log(err);

      }
    );
  }

}
