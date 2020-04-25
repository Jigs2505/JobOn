// app.routes.ts
import {Router} from 'express';
import { languagesTable } from './../util/languages/languages-table';

import * as _ from 'lodash';
import * as request from 'request';
import { LanguagesManager } from '../util/languages/languages-manager';
import { RequestHandler } from '../util/jdoodle-request-handler/request-handler';

// tslint:disable-next-line: interface-over-type-literal
type ClientRunRequestBody = {   // your client request scheme
  lang: string,
  version: string,
  program: string,
  input: string
};
// tslint:disable-next-line: interface-over-type-literal
type JdoodleResponseBody = {   // Jdoodle response body scheme
  output: string,
  statusCode: number,
  memory: string,
  cpuTime: string
};
class AppRoutes {

  public routes: Router;

  constructor() {
      this.routes = Router();
      this.initRoutes();
  }

  private initRoutes() {
      this.routes
      .get('/langs', (req, res) => {
          console.log({msg: 'GET: \'/langs\''});

         // const langs = LanguagesManager.getLanguagesMap();
          return res.status(200).send({langs: languagesTable});
      })

      .post('/run', (req, res) => {
          console.log({msg: 'POST: \'/run\''});

          const body = _.pick(req.body, ['lang', 'version', 'program', 'input']) as ClientRunRequestBody;
          if (!this.validatePostRun(body)) {
              console.log('invalid body parameters');
              return res.status(400).send('invalid body parameters');
          }

          try {

              const index = LanguagesManager.getLanguageVersionIndex(body.lang, body.version);
              RequestHandler.postRunRequest(body.lang, index, body.program, body.input)
                  // request error
                  .on('error', (error) => {
                      console.log({msg: 'postRunRequest on error', params: error});
                      return res.status(400).send(error);
                  })
                  .on('jdoodle-error', (error) => {
                      console.log({msg: 'postRunRequest on jdoodle-error', params: error});
                      return res.status(400).send(error);
                  })
                  .on('jdoodle-success', (result: JdoodleResponseBody) => {
                      console.log({msg: 'postRunRequest on jdoodle-success', params: result});
                      return res.status(200).send({runResult: result});
                  });
          } catch (error) {
              console.log('request fail');
              return res.status(400).send('request fail');
          }
      });
  }

  private validatePostRun(reqBody: ClientRunRequestBody): boolean {
      return !_.some(reqBody, (value) => _.isNil(value)) // all reqBody properties != undifined & null
          && _.isString(reqBody.lang)
          && _.isString(reqBody.version)
          && _.isString(reqBody.program)
          && !_.isEqual(reqBody.program, '') // is program not empty string
          && LanguagesManager.isLangSupported(reqBody.lang, reqBody.version); // are lang & version supported
  }
}


const appRoutes = new AppRoutes().routes;
export { appRoutes };
