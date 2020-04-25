// server-handler.service.ts
import { environment } from './../../environments/environment';
import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { LanguageTable } from '../../../server/util/languages/languages-table';

@Injectable()
export class ServerHandlerService {
    private baseUrl: string;

    constructor(private http: HttpService) {
        this.baseUrl = environment.BASE_URL;
    }

    public getAllSuppurtedLangs() {
        console.log('getAllSuppurtedLangs()');
        const queryUrl = this.baseUrl + 'langs/';
        return this.http.get<{ langs: LanguageTable }>(queryUrl)
            .pipe( map((body) => body.langs) );
    }

    public postCodeToRun(code: string, language: { id: string, version: string ,input:string}) {
        console.log('postCodeToRun()');
        const queryUrl = this.baseUrl + 'run/';
        const requestBody = { program: code, lang: language.id, version: language.version ,input:language.input};
        return this.http.post<{ runResult: any }>(queryUrl, requestBody)
            .pipe( map((body) => body.runResult) );
    }
}
