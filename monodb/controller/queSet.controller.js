const mongoose = require('mongoose');

const QueSet = mongoose.model('QueSet');
const Event = mongoose.model('Event');

module.exports.register = (req, res, next) => {
    var tc = new QueSet();
    tc.eventName=req.body.eventName;
    tc.codingQue=req.body.codingQue;
    tc.mcqQue=req.body.mcqQue;
    tc.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
          if (err.code == 11000)
            res.status(422).send(['Duplicate event name adrress found.']);
          else
            return next(err);
        }

    });

    // Event.findOne({ eventName: "JOBONFIRST"},
    //     (err, Event) => {
    //         if (!Event)
    //             return res.status(404).json({ status: false, message: 'event record not found.' });
    //         else
    //         {
    //            Event.queSet=tc;
    //            console.log(Event.queSet);
    //            //console.log(temp);
    //            Event.save((err, doc) => {
    //             if (!err)
    //               //res.send(Event);
    //               console.log(Event);
    //             else {
    //                 //return next(err);
    //             }

    //         });
    //       }
    //     });
}


module.exports.QueSetInfo= (req, res, next) =>{
  QueSet.findOne({eventName: "req.body.ename" },
        (err, QueSet) => {
            if (!QueSet)
                return res.status(404).json({ status: false, message: 'QueSet record not found.' });
            else
            {
                //console.log(company.companyAddress);
                console.log(QueSet)
                return res.status(200).json({ status: true, QueSetinfo :QueSet});
            }
        }
    );
}

module.exports.getQueset = (req, res, next) =>{
  console.log(req.query.eventName)
  QueSet.findOne({ "eventName":req.query.eventName },
        (err, QueSet) => {
            if (!QueSet)
                return res.status(200).json({ status: false, message: 'QueSet record not found.' });
            else
            {

                return res.status(200).json({ status: true, QueSets : QueSet});
            }
        }
    );
}
