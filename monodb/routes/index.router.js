const express = require('express');
const router = express.Router();

const ctrlUser = require('../controller/user.controller');
const ctrlCompany = require('../controller/company.controller');
const ctrlMcqQue= require('../controller/mcqQue.controller');
const ctrlTestcase = require('../controller/testcase.controller');
const ctrlSampleIpOp = require('../controller/sampleIpOp.controller');
const ctrlCodingQue= require('../controller/codingQue.controller');
const ctrlQueSet= require('../controller/queSet.controller');
const ctrlEvent= require('../controller/event.controller');
const jwtHelper = require('../config/jwtHelper');
const ctrlRegForEvent = require('../controller/RegForEvent.controller');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

router.post('/registercmp', ctrlCompany.register);
router.post('/authenticatecmp', ctrlCompany.authenticate);
router.get('/companyProfile',jwtHelper.verifyJwtToken, ctrlCompany.companyProfile);

router.post('/uploadMcqQue',ctrlMcqQue.register);
router.get('/showMcqQue',ctrlMcqQue.McqQueInfo);
router.get('/getMcqQueByTitle',ctrlMcqQue.getMcqQueByTitle);

router.post('/uploadtestcase',ctrlTestcase.register);
router.get('/showtestcase',ctrlTestcase.testcaseInfo);

router.post('/uploadSampleIpOp',ctrlSampleIpOp.register);
router.get('/showSampleIpOp',ctrlSampleIpOp.SampleIpOpInfo);

router.post('/uploadCodingQue',ctrlCodingQue.register);
router.get('/showCodingQue',ctrlCodingQue.CodingQueInfo);
router.get('/getCodingQueByTitle',ctrlCodingQue.getQueByTitle);

router.post('/uploadQueSet',ctrlQueSet.register);
router.get('/showQueSet',ctrlQueSet.QueSetInfo);
router.get('/getQueSet',ctrlQueSet.getQueset);

router.post('/createEvent',ctrlEvent.register);
router.get('/displayEvent',ctrlEvent.eventInfo);
router.get('/statusEvent',ctrlEvent.eventStatus);
router.put('/updateEventStatus',ctrlEvent.updateEventStatus);
router.get('/eventForCandidate',ctrlEvent.eventForCandidate);
router.get('/companyProfileId',ctrlCompany.companyProfileById);
router.get('/getEventByName',ctrlEvent.getEventByName);
router.get('/dispalyEvents',ctrlEvent.AllEvents);
router.get('/checkEvents',ctrlEvent.CheckForEvent);


router.post('/add',ctrlRegForEvent.register);
router.get('/display',ctrlRegForEvent.RegEventInfo);
router.get('/checking',ctrlRegForEvent.RegEventChecking);
router.put('/updateResult',ctrlRegForEvent.updateResult);
router.put('/updateRating',ctrlRegForEvent.updateRating);
router.get('/displayResult',ctrlRegForEvent.Result);
router.get('/eventInfo',ctrlRegForEvent.EventInfo);

module.exports = router;
