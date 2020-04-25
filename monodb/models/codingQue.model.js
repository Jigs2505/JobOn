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
    //  required: 'input can\'t be empty'
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
    title:{
      type:String,
      required: 'title required',
      unique: true
    },
    relatedTopics: {
      type: [String],
      required: 'relatedTopics not  can\'t be empty'
  },
    statement: {
        type: String,
        required: 'statement not  can\'t be empty'
    },
    eventName: {
      type: String,
      required: 'eventName not  can\'t be empty'
  },
    marks: {
        type: Number,
        required: 'marks can\'t be empty',
    },
   difficultyLevel:{
        type: String,
        required: 'difficulty level can\'t be empty'
   },
   testcases :[testcaseSchema],
   sampleIpOps: [sampleipopSchema]
});



mongoose.model('CodingQue', codingQueSchema);
