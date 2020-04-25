import { Component, OnInit } from '@angular/core';
import {RegEventService} from '../shared/regEvent.service';
import { MatTabChangeEvent } from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {Router} from  "@angular/router";
import {EventService} from '../shared/event.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
results;
events;
ename;
  constructor(private regEventService:RegEventService,private eventService:EventService) { }

  ngOnInit() {
    //this.ename = 'newevent12';


    this.eventService.getAllEvents().subscribe(
      res => {
        console.log(res['events'])
        this.events=res['events'];

      },
      err => {
        console.log(err);

      }
    );
    console.log(this.ename);


  }

  changeEvent(){
    console.log(this.ename)
    this.regEventService.displayResult(this.ename).subscribe(
      res => {
        console.log(res['regForEvents'])
        this.results=res['regForEvents'];

      },
      err => {
        console.log(err);

      }
    );
  }

}
