import { Component, OnInit } from '@angular/core';
import { Condition } from 'selenium-webdriver';
// import { GetDataService } from '../get-data.service';
import {NgForm} from '@angular/forms';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface MyObj {
  obj: any;
}

@Component({
  selector: 'app-codingtest',
  templateUrl: './codingtest.component.html',
  styleUrls: ['./codingtest.component.css']
})
export class CodingtestComponent implements OnInit {
// private MyService: GetDataService
  constructor(private sanitizer: DomSanitizer){
    this.html = this.sanitizer.bypassSecurityTrustHtml('<span style="color:##0077dd">this works</span>');
  }
  tab1 = false;
  tab2 = true;
  tab3 = true;
  tab4 = true;
  showSave = false;
  sampleipop = []
  ip = ''
  op = '';
  ipopexp = '';
  Toughness = '';
  Activetab = 0;
  errormsg = '';
  html: SafeHtml;
  selected = '';
  public value: string = `<br><br><p>The RichTextEditor triggers events based on its actions. </p>
  <p> The events can be used as an extension point to perform custom operations.</p> `;
  public Title: string = '';
  public iframe: object = { enable: true };
  public tools: object = {

    items: [
    'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
    'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
    'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
    'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
    'Indent', 'Outdent', '|', 'CreateLink', 'CreateTable',
    'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
  };
  // public iframe: object = { enable: true };
  public height: number = 500;

  ngOnInit() {
    // this.newMethod();
  }

  show(){
    this.html = this.sanitizer.bypassSecurityTrustHtml(this.value);
    alert(this.value);
  }


  Active2()
  {
    if (this.selected == '' || this.selected == 'None'){
      this.errormsg = "*please select an option";
    }
    else{
      this.tab1 = true;
      this.tab2 = false;
      this.tab3 = true;
      this.Activetab = 1;
      this.errormsg = '';

    }

  }
  Active1()
  {
    this.errormsg = '';
    this.tab1 = false;
    this.tab2 = true;
    this.tab3 = true;
    this.Activetab = 0;
  }
  Active3()
  {
    if (this.Title == ''){this.errormsg = "*please select an option"; }
    else{
      this.tab1 = true;
      this.tab2 = true;
      this.tab3 = false;
      this.Activetab = 2;
      this.errormsg = '';

    }

  }
  Active4()
  {
    if (this.Title == ''){this.errormsg = "*please select an option"; }
    else{
      this.tab1 = true;
      this.tab2 = true;
      this.tab3 = true;
      this.tab4 = false;
      this.Activetab = 3;
      this.errormsg = '';

    }

  }
  insertSampleipop(){
    if (this.ip == '' || this.op == '' || this.ipopexp == '')
    {
      this.errormsg = 'empty input';

    }
    else{
      let temp = this.sampleipop;
      temp.push({
        ip: this.ip,
        op: this.op,
        ipopexp: this.ipopexp,
      });
      console.log(temp);
      this.ip = '';
      this.op = '';
      this.ipopexp = '';
      this.sampleipop = temp;
    }


  }
  EditIpOp(ind){
    if (this.showSave){
     // console.log(event.target.ind)
   let temp = this.sampleipop[ind];
   console.log(temp)
    console.log(ind)
    }


  }
  callall(ind){
    this.EditIpOp(ind);
     console.log(ind)
    this.showSave = !this.showSave;
  }
}
