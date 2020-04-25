import { Component, OnInit } from '@angular/core';
import {McqService} from '../shared/mcq.service';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  mcqDetails;
  id;
  constructor(private mcqService:McqService) { }

  ngOnInit() {
    this.id = "123";
  this.mcqService.getMcqs(this.id).subscribe(
    res => {
      this.mcqDetails=res['mcqs'];
     console.log(res);
    },
    err => {
      console.log(err);

    }
  );
  }

}
