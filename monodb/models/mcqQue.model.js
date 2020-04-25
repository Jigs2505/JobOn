const mongoose = require('mongoose');


var mcqQueSchema = new mongoose.Schema({
    title:{
      type: String,
      required: 'title not  can\'t be empty',
      unique: true
    },
    eventName:{
      type: String,
      required: 'eventName not  can\'t be empty'
    },
    statement: {
        type: String,
        required: 'statement not  can\'t be empty'
    },
    marks: {
        type: Number,
        required: 'marks can\'t be empty',
    },
    op1: {
      type: String,
      required: 'op1 not  can\'t be empty'
    },
    op2: {
      type: String,
      required: 'op2 not  can\'t be empty'
    },
    op3: {
      type: String,
      required: 'op3 not  can\'t be empty'
    },
    op4: {
      type: String,
      required: 'op4 not  can\'t be empty'
    },
    ans: {
      type: String,
      required: 'ans not  can\'t be empty'
    },

});



mongoose.model('McqQue', mcqQueSchema);
