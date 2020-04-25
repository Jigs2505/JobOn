import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../shared/company.service';

import { Condition } from 'selenium-webdriver';
import { NgForm, FormControl } from '@angular/forms';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {McqService} from '../shared/mcq.service';
import {mcq} from '../shared/mcq.model';
import { MatSelectModule } from '@angular/material/select';

import { environment } from '../../environments/environment';
@Component({
  selector: 'app-mcqtest',
  templateUrl: './mcqtest.component.html',
  styleUrls: ['./mcqtest.component.css']
})



export class MCQTestComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer,private mcqService: McqService,private companyService: CompanyService) {
    this.html = this.sanitizer.bypassSecurityTrustHtml('<span style="color:##0077dd">this works</span>');
  }

  marks = 0;
  tab1 = false;
  tab2 = true;
  tab3 = true;
  tab4 = true;
  showSave = true;
  type = '';
  backgroundColorPrimary = 'primary';

  mcqQuestions = [];


  Toughness = '';
  editTitle = 0;
  editOp = 0;
  editTopics = 0;
  Activetab = 0;
  errormsg = '';
  html: SafeHtml;
  selected = '';
  CrctOp = '';
  opA = '';
  opB = '';
  opC = '';
  opD = '';

  public stmt = `<br><br><p>You can decalre hear  your main problem statments. </p>
  <p>kindly you can use feauturs provided by our editor as  link or photo </p> `;

  jobid=''

  public Title = '';
  public iframe: object = { enable: true };
  public tools: object = {

    items: [
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', '|',
      'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink', 'CreateTable',
      'Image', '|', 'ClearFormat', 'Print', '|',]
  };
  // public iframe: object = { enable: true };
  public height = 500;
  jobTitleList=localStorage.getItem('jobcmp');
  jobDetails;
  ngOnInit() {

    // this.companyService.getJobs(localStorage.getItem('cmpid')).subscribe(
    //   res => {
    //     console.log(localStorage.getItem('cmpid'));
    //     this.jobDetails = res['jobs'];
    //     localStorage.setItem('jobcmp',this.jobDetails)
    //    // console.log(localStorage.getItem('cmpid'))
    //     console.log(this.jobDetails);
    //   },
    //   err => {
    //     console.log(err);

    //   }
    // );
//
  }

  show() {
    this.html = this.sanitizer.bypassSecurityTrustHtml(this.stmt);
    alert(this.stmt);
  }



  Active1() {
    this.errormsg = '';
    this.tab1 = false;
    this.tab2 = true;
    this.tab3 = true;
    this.Activetab = 0;
  }
  Active2() {
    if (this.type == '' || this.type == 'None') {
      this.errormsg = '*please select an option';
    } else {
      this.tab1 = true;
      this.tab2 = false;
      this.tab3 = true;
      this.Activetab = 1;
      this.errormsg = '';

    }

  }
  Active3() {
    if (this.Title == '') { this.errormsg = '*please select an option'; } else {
      this.tab1 = true;
      this.tab2 = true;
      this.tab3 = false;
      this.Activetab = 2;
      this.errormsg = '';

    }

  }
  Active4() {
    if (this.type == 'MCQ') {
      if (this.opA == '' || this.opB == '' || this.opC == '' || this.opD == '' || this.CrctOp == '' || this.CrctOp == 'None') {
        this.errormsg = '*please fill apporopriate field ';

      } else {
        this.tab1 = true;
        this.tab2 = true;
        this.tab3 = true;
        this.tab4 = false;
        this.Activetab = 3;
        this.errormsg = '';
      }
    } else {
      if (this.Title == '') { this.errormsg = '*please select an option'; } else {
        this.tab1 = true;
        this.tab2 = true;
        this.tab3 = true;
        this.tab4 = false;
        this.Activetab = 3;
        this.errormsg = '';

      }
    }


  }



  editTitlef() {
    if (this.editTitle == 0) {
      this.editTitle = 1
    }
    else {
      this.editTitle = 0
    }
  }

  editTopicsf() {
    if (this.editTopics == 0) {
      this.editTopics = 1
    }
    else {
      this.editTopics = 0
    }
  }

  editOpf() {
    if (this.editOp == 0) {
      this.editOp = 1
    }
    else {
      this.editOp = 0
    }
  }
  SaveQ() {

    const temp = this.mcqQuestions;
    if (this.Toughness == 'Easy') {
      this.marks += 5;
    }
    else if (this.Toughness == 'Mediam') {
      this.marks += 10;
    }
    else {
      this.marks += 15;
    }
    temp.push({
      Title: this.Title,

      marks: this.marks,
      statment: this.stmt,
      toughness : this.Toughness,
      ans: this.CrctOp,
      op1: this.opA,
      op2: this.opB,
      op3: this.opC,
      op4: this.opD,
      jobId:this.jobid
    });
    var regMcq: mcq={
      title:'xyz',
      marks: this.marks,
      statement: this.stmt,
      ans: this.CrctOp,
      op1: this.opA,
      op2: this.opB,
      op3: this.opC,
      op4: this.opD,
      eventName: 'HELLOJOBON'
    }

      this.mcqService.postMcq(regMcq).subscribe(
        res => {
         console.log(res);
        },
        err => {
          console.log(err);

        }
      );



    this.mcqQuestions = temp;
    console.log(temp);
    this.tab1 = false;
    this.tab2 = true;
    this.tab3 = true;
    this.Activetab = 0;
    this.errormsg = '';
    this.marks = 0;
    this.Toughness = '';
    this.editTitle = 0;
    this.editOp = 0;
    this.editTopics = 0;
    this.Activetab = 0;
    this.errormsg = '';
    this.jobid='';
    this.selected = '';
    this.CrctOp = '';
    this.opA = '';
    this.opB = '';
    this.opC = '';
    this.opD = '';
    this.stmt = `<br><br><p>You can decalre hear  your main problem statments. </p>
          <p>kindly you can use feauturs provided by our editor as  link or photo </p> `;

    this.Title = '';
  }



}

