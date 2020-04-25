
import { Component, QueryList, OnInit, ViewChild, ViewChildren, ElementRef, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from "@angular/router";



import { LanguageTable, Language } from './../../../server/util/languages/languages-table';
import { CodeEditorComponent } from './../code-editor';
import { ServerHandlerService } from './../../services';
import {
  DEFAULT_INIT_EDITOR_OPTIONS,
  DEFAULT_SUPPORTED_EDITOR_THEMES,
  DEFAULT_RUN_ERROR_MESSAGE
} from './default-options';

import { EventService } from '../shared/event.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatTabChangeEvent } from '@angular/material';
import { RegEventService } from '../shared/regEvent.service';
import { response } from 'express';
import { ActivatedRoute } from '@angular/router';

// interface mcqQtest {
//   ind: number;
//   ans: string;

// }
// interface codingQtest {
//   ind: number;
//   code: string;
//   testcasepassed: number;
// }
@Component({
  selector: 'app-viewtest',
  templateUrl: './viewtest.component.html',
  styleUrls: ['./viewtest.component.scss']
})

export class ViewtestComponent implements OnInit {

  Queset;
  tempM = [];
  tempQ = [];
  temp = [];
  Activetab = 0;
  noofMCQ = 0;
  noOfCodeQ = 0;
  CrctOp = 'None';
  result = 0;
  s;
  constructor(private eventService: EventService, private _Activatedroute: ActivatedRoute, private sanitizer: DomSanitizer, private regEventService: RegEventService, private handler: ServerHandlerService, private router: Router) { }

  public activatedTheme: string;
  // indicate if the initial languages api request failed or not.
  public cantReachServer = false;
  // options to init the editor with.
  public initEditorOptions = DEFAULT_INIT_EDITOR_OPTIONS;
  // array of the supported themes names.
  public supportedThemes = DEFAULT_SUPPORTED_EDITOR_THEMES;
  // code editor conponent reference
  @ViewChildren(CodeEditorComponent) codeEditor: QueryList<CodeEditorComponent>;
  @ViewChildren('custip') customip: QueryList<ElementRef>;
  // languages select element reference.
  @ViewChildren('languagesSelect') languagesSelect: QueryList<ElementRef>;
  // array of the supported languages, to simplify the usage in the component code
  private languagesArray: Language[] = [];
  // observable of the supported languages.
  public languagesArray$: Observable<Language[]>;
  // observable of the run request output.
  public output$: Observable<string>;
  public SubmitOutput$: RunResult;
  SubmissionArray = []
  public isOn: boolean;
  public msg = '';
  public visibleIp = false;
  public visibleTable = false;
  InputCode = '';
  codingQue;
  custipTemp

  timeLeft: number;
  interval;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft = JSON.parse(localStorage.getItem('time'));
        this.timeLeft--;
        localStorage.setItem('time', JSON.stringify(this.timeLeft));

      } else {
        this.pauseTimer()
        this.submitAllMcq()
        console.log('timeout');
        //redirect
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);

  }







  ngOnInit() {
    //localStorage.clear()
    localStorage.setItem('ename', this._Activatedroute.snapshot.paramMap.get("ename"));
    const ename = localStorage.getItem('ename');
    this.languagesArray$ = this.pipeSuppurtedLanguages();
    this.activatedTheme = this.initEditorOptions.theme;
    this.startTimer();
    this.timeLeft = JSON.parse(localStorage.getItem('time'));
    console.log(this.timeLeft);
    if (this.timeLeft == null || this.timeLeft == 0) {
      this.timeLeft = 60;
    }

    localStorage.setItem('time', JSON.stringify(this.timeLeft));
    localStorage.setItem('tempM', JSON.stringify(this.tempM));
    localStorage.setItem('tempQ', JSON.stringify(this.tempQ));
    localStorage.setItem('result', JSON.stringify(this.result));
    //const ename = 'JANTACURFUWE';


    // this.eventService.checkEvents(ename).subscribe(
    //   res => {
    //     console.log(res['events']);
    //     if(res['status'] == false)
    //     {
    //       console.log('inside res of errorpage')
    //       this.router.navigateByUrl('/error');
    //     }
    //   },
    //   err => {
    //     console.log('inside err of errorpage')
    //     console.log(err);

    //   }
    // );

    console.log(this.codeEditor)
    this.eventService.getEventByName(ename).subscribe(
      res => {
        this.Queset = res['Quesets'];
        this.Queset.mcqQue.forEach(element => {
          element.statement = this.sanitizer.bypassSecurityTrustHtml(element.statement);
          this.noofMCQ += 1;
        });
        this.Queset.codingQue.forEach(element => {
          element.statement = this.sanitizer.bypassSecurityTrustHtml(element.statement);
          this.noOfCodeQ += 1;
        });

        console.log(this.Queset);
        console.log(this.noofMCQ);
        console.log(this.noOfCodeQ);
        console.log(this.Queset.codingQue[0].sampleIpOps);
      },
      err => {
        console.log(err);

      }
    );
  }

  onTimeOut() {

  }



  // #region - private
  private pipeSuppurtedLanguages() {
    return this.handler.getAllSuppurtedLangs()
      .pipe(
        // reduce the incoming table to languages array.
        map((languages: LanguageTable) => {
          console.log(languages);
          return Array.from(languages).reduce<Language[]>((langsArray, entry) => {
            return langsArray.concat(entry[1]);
          }, []);
        }),
        // store the array in a member.
        tap((languages: Language[]) => this.languagesArray = languages),
        // console log any error and returning an empty array.
        catchError((err) => {
          console.log(err);
          this.cantReachServer = true;
          this.languagesArray = [];
          return of(this.languagesArray);
        })
      );

  }
  // #endregion

  // #region - public
  public onClearContent(MycodeEditor, index) { MycodeEditor.setContent(''); }

  public onBeautifyContent(MycodeEditor, index) { MycodeEditor.beautifyContent(); }

  public onRunContent(MycodeEditor, custip, lngSelect, index, codingQue) {
    console.log(codingQue);
    console.log(custip.value)
    this.isOn = true;
    console.log(MycodeEditor)
    console.log(index)
    this.msg = "code is running...";
    //  console.log(lngSelect);
    // event.target.classList.add('spinner-border text-light');
    const code = MycodeEditor.getContent();
    // console.log("code")
    console.log(code);

    //console.log(this.isOn);
    console.log(lngSelect._results[index]);
    if (lngSelect && code && code.length > 0) {
      const languagesSelectElement = lngSelect._results[index].nativeElement as HTMLSelectElement;
      // console.log(lngSelect._results[index].nativeElement)
      //console.log(languagesSelectElement)
      const inedx = languagesSelectElement.selectedIndex;
      const language = this.languagesArray[inedx];
      // console.log(language.lang);
      if (custip.value == '') {
        console.log('in standerd input')
        console.log(codingQue.sampleIpOps[0].input);
        this.custipTemp = codingQue.sampleIpOps[0].input;
      }
      else {
        this.custipTemp = custip.value;
      }
      this.output$ = this.handler.postCodeToRun(code, {
        id: language.lang, version: language.version, input: this.custipTemp
      }).pipe(
        // returning the output content.
        map((response: RunResult) => response.output),

        // console log any error and returning an error message.
        catchError((err) => {
          console.log(err);
          return of(DEFAULT_RUN_ERROR_MESSAGE);
        })
      );

      this.isOn = false;
      console.log(this.isOn);
      console.log(this.output$);
    }
    console.log(this.output$);
  }

  public submit(MycodeEditor, lngSelect, codingQue, index) {
    console.log(codingQue);
    this.visibleTable = true;
    this.isOn = true;
    console.log(MycodeEditor)
    console.log(index)
    this.msg = "code is running...";
    //  console.log(lngSelect);
    // event.target.classList.add('spinner-border text-light');
    const code = MycodeEditor.getContent();
    // console.log("code")
    console.log(code);
    console.log(lngSelect._results[index]);
    if (this.languagesSelect && code && code.length > 0) {
      const languagesSelectElement = lngSelect._results[index].nativeElement as HTMLSelectElement;
      // console.log(lngSelect._results[index].nativeElement)
      // console.log(languagesSelectElement)
      const ind = languagesSelectElement.selectedIndex;
      const language = this.languagesArray[ind];
      this.SubmissionArray = []
      codingQue.testcases.forEach((tc, tindex) => {
        console.log(tc),
          this.handler.postCodeToRun(code, {
            id: language.lang, version: language.version, input: tc.input
          }).subscribe(
            res => {
              console.log(res, tindex);

              if (res['output'].trim() == codingQue.testcases[tindex].output.trim()) {
                const temp = this.SubmissionArray
                temp.push({ 'index': tindex, 'output': res, 'status': 'pass' })
                this.SubmissionArray = temp
              }
              else if (res['memory'] == null) {
                const temp = this.SubmissionArray
                temp.push({ 'index': tindex, 'output': res, 'status': 'Runtime error' })
                this.SubmissionArray = temp
              }
              else {
                const temp = this.SubmissionArray
                temp.push({ 'index': tindex, 'output': res, 'status': 'fail' })
                this.SubmissionArray = temp
              }
            },
            err => { console.error(); },
            () => {
              this.SubmissionArray = this.SubmissionArray.sort((n1, n2) => n1.index - n2.index)
              console.log(this.SubmissionArray);
              var flag = 0
              if (this.SubmissionArray.length == codingQue.testcases.length) {
                this.SubmissionArray.forEach(element => {
                  if (element.status != 'pass') {
                    flag = 1
                  }
                });
                if (flag != 1) {
                  var flag2 = 0
                  let tempQ = JSON.parse(localStorage.getItem('tempQ'));
                  tempQ.forEach(element => {
                    if (element.index == index) {
                      flag2 = 1
                    }
                  });
                  if (flag2 != 1) {
                    console.log(codingQue)
                    console.log(codingQue[index])
                    let jsonResult = { result: codingQue.marks };
                    let ename = localStorage.getItem('ename');
                    let uname = localStorage.getItem('user');
                    this.regEventService.updateResult(ename, uname, jsonResult).subscribe(
                      res => {
                        console.log(res['regForEvents']);
                      },
                      err => {
                        console.log(err);

                      }
                    );
                    var temp = tempQ;
                    temp.push({ 'index': index })
                    tempQ = temp
                    localStorage.setItem('tempQ', JSON.stringify(tempQ));
                    console.log(JSON.parse(localStorage.getItem('tempQ')));
                    //response.redirect('../rating.component.ts');
                    //this.router.navigate(['/giveRating'])
                  }
                }
              }

            });


        //console.log(this.SubmitOutput$,tindex);
        console.log('loop iter end')
      });

      console.log('end');
    }
  }

  public onChangeTheme(theme: string, MycodeEditor) {
    if (this.supportedThemes.includes(theme)) {
      MycodeEditor.setEditorTheme(theme);
    }
  }

  public onChangeLanguageMode(event: any, MycodeEditor: CodeEditorComponent) {
    const selectedIndex = event.target.selectedIndex;
    const language = this.languagesArray[selectedIndex];
    const langMode = language.lang;
    console.log(langMode)
    MycodeEditor.setLanguageMode(langMode);
    console.log(MycodeEditor.getLangMode())
  }
  // #endregion
  public custipOnOff() {
    console.log('custip called\n');
    if (this.visibleIp == true) {
      this.visibleIp = false;
    } else {
      this.visibleIp = true;
    }
  }












  submitMcq(ind, CrctOp) {
    let tempM = JSON.parse(localStorage.getItem('tempM'));
    let flag = 0;
    if (CrctOp == 'None' || CrctOp == undefined) {
      window.alert('Select an Option Firtstk ');
    } else {
      const temp = tempM;
      temp.forEach(e => {
        if (e.ind == ind) {
          e.ans = CrctOp;
          tempM = temp;
          localStorage.setItem('tempM', JSON.stringify(tempM));
          console.log(JSON.parse(localStorage.getItem('tempM')));
          flag = 1;

        }
      });
      if (flag == 0) {
        temp.push({
          ind,
          ans: CrctOp
        });
        tempM = temp;
        localStorage.setItem('tempM', JSON.stringify(tempM));
        console.log(JSON.parse(localStorage.getItem('tempM')));
      }

    }

  }
  nextMcq(ind) {
    let flag = 0;
    this.Activetab = ((ind) + 1) % this.noofMCQ;
    let tempM = JSON.parse(localStorage.getItem('tempM'));
    tempM.forEach(element => {
      if (element.ind == ind) {
        this.CrctOp = element.ans;
        flag = 1;
      }
      if (flag == 0) {
        this.CrctOp = 'None';

      }
    });


  }
  MCQtabChanged(tabChangeEvent: MatTabChangeEvent) {
    let flag = 0;
    console.log('efghjgjgkj');
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
    let tempM = JSON.parse(localStorage.getItem('tempM'));
    tempM.forEach(element => {
      if (element.ind == tabChangeEvent.index) {
        this.CrctOp = element.ans;
        flag = 1;
      }
    });
    if (flag == 0) {
      this.CrctOp = 'None';
    }
  }
  submitAllMcq() {
    let tempM = JSON.parse(localStorage.getItem('tempM'));
    let resultM = JSON.parse(localStorage.getItem('result'));
    let AnsM = this.Queset.mcqQue;
    tempM.forEach(element => {
      let i = element.ind;
      if (AnsM[i].ans == element.ans) {
        resultM += AnsM[i].marks;
        console.log(resultM);

        console.log(AnsM[i]);
      }
    });
    this.result = resultM;
    localStorage.setItem('result', JSON.stringify(this.result));
    console.log(this.result);
    let jsonResult = { result: this.result };
    let ename = localStorage.getItem('ename');
    let uname = JSON.parse(localStorage.getItem('user')).fullName;
    console.log('ename')
    console.log('uname')
    this.regEventService.updateResult(ename, uname, jsonResult).subscribe(
      res => {
        console.log(res['regForEvents']);
      },
      err => {
        console.log(err);

      }
    );

  }
  CodetabChanged(tabChangeEvent: MatTabChangeEvent) {
    this.visibleIp = false
    this.visibleTable = false
  }

}
interface RunResult {
  output: string;
  statusCode: number;
  memory: string;
  cpuTime: string;
}
