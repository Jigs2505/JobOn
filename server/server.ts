import * as express from 'express';
import * as bodyParser from 'body-parser';
import './config/config.ts';   // include the '.ts' extension

import { appRoutes } from './routes/app.routes';

import {whiteOrigins} from './white-lists';
var cors = require('cors');

const PORT = 3000;

class ExpressApp {

    public app: express.Application;


    constructor() {
        this.app = express();
        this._init();
    }

    private _init(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        if (process.env.NODE_ENV !== 'test') {
          this.enableCrossOrigin();
        }
      }
      private enableCrossOrigin() {
        this.app.use((req, res, next) => {
            const origin = req.headers.origin as string;
            // tslint:disable-next-line: no-bitwise
            if (origin && typeof origin === 'string' && ~whiteOrigins.indexOf(origin.trim())) {
                res.setHeader('Access-Control-Allow-Origin', origin);
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                res.setHeader('Access-Control-Allow-Credentials', 'true');
            }
            next();
        });
    }
}

const app = new ExpressApp().app;
app.use(cors());
app.use(appRoutes); // connecting routes
app.listen(process.env.PORT || PORT, () => {
    console.log(`server running on port ${PORT}`);
});
