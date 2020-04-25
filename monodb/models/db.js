const mongoose=require("mongoose");
const abc=require('../config/config');

mongoose.connect(process.env.MONGODB_URI,(err)=>{
  if(!err){
    console.log('MongoDb connection succeede');}
  else{console.log('Error in MongoDB connection:'+JSON.stringify(err,undefined,2));}
});

require('./user.model');
require('./company.model');
require('./mcqQue.model');
require('./TestCase.model');
require('./codingQue.model');
require('./queSet.model');
require('./sampleIpOp.model');
require('./event.model');
require('./RegForEvent.model');
