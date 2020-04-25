import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { LanguageTable, Language } from './../../../../server/util/languages/languages-table';
import { CodeEditorComponent } from './../../code-editor';
import { ServerHandlerService } from './../../../services';
import {
    DEFAULT_INIT_EDITOR_OPTIONS,
    DEFAULT_SUPPORTED_EDITOR_THEMES,
    DEFAULT_RUN_ERROR_MESSAGE
} from './default-options';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
}) export class MainPageComponent implements OnInit {
    constructor(private handler: ServerHandlerService) { }

    public activatedTheme: string;
    // indicate if the initial languages api request failed or not.
    public cantReachServer = false;
    // options to init the editor with.
    public initEditorOptions = DEFAULT_INIT_EDITOR_OPTIONS;
    // array of the supported themes names.
    public supportedThemes = DEFAULT_SUPPORTED_EDITOR_THEMES;
    // code editor conponent reference
    @ViewChild(CodeEditorComponent, {static: false}) codeEditor: CodeEditorComponent;
    // languages select element reference.
    @ViewChild('languagesSelect', {static: false}) languagesSelect: ElementRef;
    // array of the supported languages, to simplify the usage in the component code
    private languagesArray: Language[] = [];
    // observable of the supported languages.
    public languagesArray$: Observable<Language[]>;
    // observable of the run request output.
    public output$: Observable<string>;
    public isOn: boolean;
    public msg:string='';
    public visibleIp=false;
    InputCode: string='';
    ngOnInit() {
        this.languagesArray$ = this.pipeSuppurtedLanguages();
        this.activatedTheme = this.initEditorOptions.theme;
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
                tap((languages: Language[]) => this.languagesArray = languages ),
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
    public onClearContent() { this.codeEditor.setContent(''); }

    public onBeautifyContent() { this.codeEditor.beautifyContent(); }

    public onRunContent() {
        this.isOn = true;
        this.msg="code is running...";
      console.log(this.codeEditor)
        // event.target.classList.add('spinner-border text-light');
        const code = this.codeEditor.getContent();
        console.log(code);
        console.log(this.InputCode);
        console.log(this.isOn);
        console.log(this.languagesSelect);
        if (this.languagesSelect && code && code.length > 0) {
            const languagesSelectElement = this.languagesSelect.nativeElement as HTMLSelectElement;
            const inedx = languagesSelectElement.selectedIndex;
            const language = this.languagesArray[inedx];
            console.log(language.lang);
            this.output$ = this.handler.postCodeToRun(code, {
                id: language.lang, version: language.version, input:this.InputCode
            }).pipe(
                // returning the output content.
                map((response: RunResult) => response.output ),

                // console log any error and returning an error message.
                catchError((err) => {
                    console.log(err);
                    return of(DEFAULT_RUN_ERROR_MESSAGE);
                })
            );
            this.isOn=false;
            console.log(this.isOn);

            console.log(this.output$);


        }
        console.log(this.output$);
    }

    public onChangeTheme(theme: string) {
        if (this.supportedThemes.includes(theme)) {
            this.codeEditor.setEditorTheme(theme);
        }
    }

    public onChangeLanguageMode(event: any) {
        const selectedIndex = event.target.selectedIndex;
        const language = this.languagesArray[selectedIndex];
        const langMode = language.lang;
        console.log(langMode)
        this.codeEditor.setLanguageMode(langMode);
    }
    // #endregion
    public custip()
    {
      console.log("custip called\n");
      if(this.visibleIp == true)
      {
        this.visibleIp= false;
      }
      else{
        this.visibleIp= true;
      }
    }



}

interface RunResult {
    output: string;
    statusCode: number;
    memory: string;
    cpuTime: string;
}
