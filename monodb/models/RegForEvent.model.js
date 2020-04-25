const mongoose = require('mongoose');


var regEventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: 'eventName name can\'t be empty'
    },
    userName: {
        type: String,
        required: 'userName can\'t be empty'
    },
    result: {
      type: Number
    },
    total:Number,
    QOSRating: {
      type: Number
    },
    jobOnRating: {
        type: Number
    }
});


mongoose.model('regEvent', regEventSchema);
