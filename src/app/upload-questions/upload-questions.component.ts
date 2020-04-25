import { Component, OnInit } from '@angular/core';
import { Condition } from 'selenium-webdriver';
import { environment } from '../../environments/environment';
 // import { GetDataService } from '../get-data.service';
import {NgForm, FormControl} from '@angular/forms';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import {EventService} from '../shared/event.service';
import {Router} from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {McqService} from '../shared/mcq.service';
import {CodeService} from '../shared/code.service';
import {QueSetService} from '../shared/queset.service';
import {mcq} from '../shared/mcq.model';
import {queset} from '../shared/queset.model';
import {MatSelectModule} from '@angular/material/select';
import { code } from '../shared/code.model';
import { ActivatedRoute } from '@angular/router';
interface MyObj {
  obj: any;
}

interface testcasex {
  input: string;
  output: string;
  explaination: string;
  edit:number
}
interface sampleipopx {

  input: string;
  output: string;
  explaination: string;
  edit:number
}




@Component({
  selector: 'app-upload-questions',
  templateUrl: './upload-questions.component.html',
  styleUrls: ['./upload-questions.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class UploadQuestionsComponent implements OnInit {
// private MyService: GetDataService,
  constructor(private mcqService: McqService,private router:Router,private eventService:EventService,private _Activatedroute:ActivatedRoute, private codeService: CodeService,private queSetService:QueSetService, private sanitizer: DomSanitizer) {
    this.html = this.sanitizer.bypassSecurityTrustHtml('<span style="color:##0077dd">this works</span>');
  }


  tab1 = false;
  tab2 = true;
  tab3 = true;
  tab4 = true;
  showSave = true;
  type = '';
  marks = 0;
  backgroundColorPrimary = 'primary';
  sampleipop: sampleipopx[] = [];
  testcases: testcasex[] = [];
  codingQuestions = [];
  mcqQuestions = [];
  tip = '';
  top = '';
  tipopexp = '';

  ip = '';
  op = '';
  ipopexp = '';

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
  companyDetails;

  // eventId:number;

  public stmt = `<br><br><p>You can decalre hear  your main problem statments. </p>
  <p>kindly you can use feauturs provided by our editor as  link or photo </p> `;
  topics = new FormControl();

  topicslist: string[] = ['Array', 'Dp', 'Math',   'String', 'tree', 'Graph'];
  public Title = '';

  // public iframe: object = { enable: true };

  public tools: object = {
    items: ['Undo', 'Redo', '|',
        'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
        'SubScript', 'SuperScript', '|',
        'LowerCase', 'UpperCase', '|',
        'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
        'Indent', 'Outdent', '|', 'CreateLink',
        'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
};
public iframe: object = { enable: true };
public height: number = 500;
  ngOnInit() {
    // this.newMethod();
    // this.env.eventId=0;

  console.log(this._Activatedroute.snapshot.paramMap.get("ename"))
    localStorage.setItem('ename', this._Activatedroute.snapshot.paramMap.get("ename"));

    const qs:queset= {
      eventName:this._Activatedroute.snapshot.paramMap.get("ename")
    }

    this.queSetService.findQueset(this._Activatedroute.snapshot.paramMap.get("ename")).subscribe(
      res => {
        if(res['status'] == true)
        {

        }
        else{
          this.queSetService.postqueset(qs).subscribe(
            res => {
              console.log(res);
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

  show() {
    this.html = this.sanitizer.bypassSecurityTrustHtml(this.stmt);
    alert(this.stmt);
  }

  EndQ() {
    var ename=localStorage.getItem('ename');
    var status='UPLOADED'
    this.eventService.updateEventStatus(ename,status).subscribe(
      res => {
      this.companyDetails = res['events'];
      console.log(this.companyDetails);
      },
      err => {
        console.log(err);

      }
    );
    this.router.navigateByUrl('/companyprofile');
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
    if (this.Title == '')
    {
      this.errormsg = '*please select an option';
    }
    else
    {
      if(this.type == 'MCQ')
      {
        this.mcqService.getMcqQueByTitle(this.Title).subscribe(
          res => {
            if(res['status'] == true)
            {
              window.alert('please select unique title');
              this.errormsg='tilte is not unique'
            }
            else
            {

              this.tab1 = true;
              this.tab2 = true;
              this.tab3 = false;
              this.Activetab = 2;
              this.errormsg = '';
            }
           console.log(res);
          },
          err => {
            console.log(err);

          }
        );

        }
        else
        {
          this.codeService.getCodingQueByTitle(this.Title).subscribe(
            res => {
              console.log(res['status']);
              if(res['status'] == true)
              {
                window.alert('please select unique title');
                this.errormsg='tilte is not unique'
              }
              else
              {
                this.tab1 = true;
                this.tab2 = true;
                this.tab3 = false;
                this.Activetab = 2;
                this.errormsg = '';
              }
             console.log(res);
            },
            err => {
              console.log(err);

            }
          );
        }

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
      if (this.Title == '') {this.errormsg = '*please select an option'; } else {
        this.tab1 = true;
        this.tab2 = true;
        this.tab3 = true;
        this.tab4 = false;
        this.Activetab = 3;
        this.errormsg = '';

      }
    }


  }


  insertSampleipop() {
    if (this.ip == '' || this.op == '' || this.ipopexp == '') {
      this.errormsg = 'empty fields';

    } else {
      if (this.sampleipop.length != 10) {
        const temp = this.sampleipop;
        temp.push({
          input: this.ip,
          output: this.op,
          explaination: this.ipopexp,
           edit:0,
        });
        console.log(temp);
        this.ip = '';
        this.op = '';
        this.ipopexp = '';
        this.sampleipop = temp;


      } else {
        this.errormsg = 'Limit Reaches!!!';
      }


    }


  }


  insertTestCase() {
    if (this.tip == '' || this.top == '' || this.tipopexp == '') {
      this.errormsg = 'empty fields';

    } else {
      if (this.testcases.length != 10) {
        const temp = this.testcases;
        temp.push({
          input: this.tip,
          output: this.top,
          explaination: this.tipopexp,
          edit:0,
        });
        console.log(temp);
        this.tip = '';
        this.top = '';
        this.tipopexp = '';
        this.testcases = temp;


      } else {
        this.errormsg = 'Limit Reaches!!!';
      }


    }


  }

  EditSampleIpOP(ind, i, o, e) {
    if (this.showSave) {
      const temp = this.sampleipop;
      temp[ind].edit=1;
      this.sampleipop = temp;
      this.showSave = false;
    } else {
      this.showSave = true;

      const temp = this.sampleipop;
       temp[ind].edit=0;
      temp[ind].input = i;
      temp[ind].output = o;
      temp[ind].explaination = e;
      this.sampleipop = temp;
    }

  }



  EditTestCase(ind, i, o, e) {
    if (this.showSave) {
      const temp = this.testcases;
      temp[ind].edit=1;
      this.testcases = temp;
      this.showSave = false;
    } else {
      this.showSave = true;

      const temp = this.testcases;
       temp[ind].edit=0;
      temp[ind].input = i;
      temp[ind].output = o;
      temp[ind].explaination = e;
      this.testcases = temp;
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
    if (this.type == 'MCQ')
    {
      const temp = this.mcqQuestions;
      if (this.Toughness == 'Easy') {
        this.marks += 5;
      } else if (this.Toughness == 'Mediam') {
        this.marks += 10;
      } else {
        this.marks += 15;
      }
      temp.push({
        title: this.Title,
        type: this.type,
        marks: this.marks,
        statment: this.stmt,
        toughness: this.Toughness,
        relatedTopics: this.topics.value,
        opA: this.opA,
        opB: this.opB,
        opC: this.opC,
        opD: this.opD,

      });

      const regMcq: mcq = {
        title:this.Title,
        marks: this.marks,
        statement: this.stmt,
        ans: this.CrctOp,
        op1: this.opA,
        op2: this.opB,
        op3: this.opC,
        op4: this.opD,
        eventName: localStorage.getItem('ename')
      };

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
      this.tip = '';
      this.top = '';
      this.tipopexp = '';

      this.ip = '';
      this.op = '';
      this.ipopexp = '';

      this.Toughness = '';
      this.editTitle = 0;
      this.editOp = 0;
      this.editTopics = 0;
      this.Activetab = 0;
      this.errormsg = '';

      this.selected = '';
      this.CrctOp = '';
      this.opA = '';
      this.opB = '';
      this.opC = '';
      this.opD = '';
      this.stmt = `<br><br><p>You can decalre hear  your main problem statments. </p>
          <p>kindly you can use feauturs provided by our editor as  link or photo </p> `;
      this.topics = new FormControl();

      this.topicslist = ['Array', 'Dp', 'Math',   'String', 'tree', 'Graph'];
      this.Title = '';
    }
    else
    {
      const temp = this.codingQuestions;
      if (this.Toughness == 'Easy') {
        this.marks += 50;
      } else if (this.Toughness == 'Mediam') {
        this.marks += 100;
      } else {
        this.marks += 150;
      }
      let sampleipopfinal=[]
      this.sampleipop.forEach(e=>{
        sampleipopfinal.push({input:e.input,output:e.output,explaination:e.explaination})
      });
      let testipopfinal=[]
      this.testcases.forEach(e=>{
        testipopfinal.push({input:e.input,output:e.output,explaination:e.explaination})
      });
      temp.push({
        title: this.Title,
        type: this.type,
        statment: this.stmt,
        difficultyLevel: this.Toughness,
        marks: this.marks,
        relatedTopics: this.topics.value,
        eventName: localStorage.getItem('ename'),
        sampleipop: sampleipopfinal,
        testcases: testipopfinal

      });
      console.log(temp);
      const regCode: code = {
        title:this.Title,
        marks: this.marks,
        eventName: localStorage.getItem('ename'),
        statement: this.stmt,
        difficultyLevel: this.Toughness,
        relatedTopics:this.topics.value,
        testcases: testipopfinal,
        sampleIpOps: sampleipopfinal,

      };
      console.log(regCode);
      this.codeService.postCode(regCode).subscribe(
          res => {
           console.log(res);
          },
          err => {
            console.log(err);

          }
        );

      this.codingQuestions = temp;
      this.tab1 = false;
      this.tab2 = true;
      this.tab3 = true;
      this.Activetab = 0;
      this.errormsg = '';
      this.tip = '';
      this.top = '';
      this.tipopexp = '';

      this.ip = '';
      this.op = '';
      this.ipopexp = '';

      this.Toughness = '';
      this.editTitle = 0;
      this.editOp = 0;
      this.editTopics = 0;
      this.Activetab = 0;
      this.errormsg = '';

      this.selected = '';
      this.CrctOp = '';
      this.opA = '';
      this.opB = '';
      this.opC = '';
      this.opD = '';
      this.sampleipop = [];
      this.testcases = [];
      this.stmt = `<br><br><p>You can decalre hear  your main problem statments. </p>
        <p>kindly you can use feauturs provided by our editor as  link or photo </p> `;
      this.topics = new FormControl();

      this.topicslist = ['Array', 'Dp', 'Math',   'String', 'tree', 'Graph'];
      this.Title = '';
    }


  }

}
