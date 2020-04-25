const mongoose = require('mongoose');

var testcaseSchema = new mongoose.Schema({
  input: {
      type: String,
     // required: 'input can\'t be empty'
  },
  output: {
      type: String,
     // required: 'output can\'t be empty',
  },
  explaination: {
    type: String,
    //required: 'explaination can\'t be empty'
  }
});

var sampleipopSchema = new mongoose.Schema({
  input: {
      type: String,
     // required: 'input can\'t be empty'
  },
  output: {
      type: String,
    //  required: 'output can\'t be empty',
  },
  explaination: {
    type: String,
    //required: 'explaination can\'t be empty'
  }
});

var codingQueSchema = new mongoose.Schema({
    statement: {
        type: String,
      //  required: 'statement not  can\'t be empty'
    },
    marks: {
        type: Number,
      //  required: 'marks can\'t be empty',
    },
   difficultyLevel:{
        type: String,
      //  required: 'difficulty level can\'t be empty'
   },
   testcases :[testcaseSchema],
   sampleIpOps: [sampleipopSchema]
});

var mcqQueSchema = new mongoose.Schema({
  statement: {
      type: String,
    //  required: 'statement not  can\'t be empty'
  },
  marks: {
      type: Number,
     // required: 'marks can\'t be empty',
  },
  op1: {
    type: String,
   // required: 'op1 not  can\'t be empty'
  },
  op2: {
    type: String,
   // required: 'op2 not  can\'t be empty'
  },
  op3: {
    type: String,
   // required: 'op3 not  can\'t be empty'
  },
  op4: {
    type: String,
   // required: 'op4 not  can\'t be empty'
  },
  ans: {
    type: String,
  //  required: 'ans not  can\'t be empty'
  },

});

var queSetSchema = new mongoose.Schema({
  eventName:{
      type: String,
      //required: 'Event N can\'t be empty',
      //unique: true
  },
  codingQue:[codingQueSchema],
  mcqQue:[mcqQueSchema]
});

var eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: 'eventName name can\'t be empty',
        unique: true
    },
    strength: {
        type: Number,
        required: 'strength can\'t be empty',
    },
    companyId: {
      type: String,
      required: 'companyId can\'t be empty'
    },
    regStartDate: {
      type: Date,
      required: 'regStartDate can\'t be empty'
    },
    eventDate: {
        type: Date,
        required: 'eventDate can\'t be empty',
    },
    status: {
      type: String,
    },
    queSet:queSetSchema
});


mongoose.model('Event', eventSchema);
