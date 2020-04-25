const mongoose = require('mongoose');

var sampleipopSchema = new mongoose.Schema({
    input: {
        type: String,
        required: 'input can\'t be empty'
    },
    output: {
        type: String,
        required: 'output can\'t be empty',
    },
    explaination: {
      type: String,
      required: 'explaination can\'t be empty'
    }
});



mongoose.model('SampleIpOp', sampleipopSchema);
