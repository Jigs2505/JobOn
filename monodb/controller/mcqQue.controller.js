const mongoose = require('mongoose');

const McqQue = mongoose.model('McqQue');
const QueSet = mongoose.model('QueSet');

module.exports.register = (req, res, next) => {
    var tc = new McqQue();
   // console.log('inside mcqquecontroller register methos');
    tc.title=req.body.title;
    tc.eventName=req.body.eventName;
    tc.statement=req.body.statement;
    tc.marks=req.body.marks;
    tc.op1=req.body.op1;
    tc.op2=req.body.op2;
    tc.op3=req.body.op3;
    tc.op4=req.body.op4;
    tc.ans=req.body.ans;

    tc.save((err, doc) => {
        if (!err)
           console.log(tc)
        else {
            //return next(err);
        }

    });
    console.log(req.body.eventName);
    QueSet.findOne({ eventName: req.body.eventName},
      (err, QueSet) => {
          if (!QueSet)
              return res.status(404).json({ status: false, message: 'QueSet record not found.' });
          else
          {
             temp=QueSet.mcqQue;
             console.log(QueSet.mcqQue);

             temp.push(tc)
             QueSet.save((err, doc) => {
              if (!err)
                res.send(QueSet);
              else {
                  //return next(err);
              }

          });

             // return res.status(200).json({ status: true, QueSetinfo :QueSet});
          }
      }
  );
}

module.exports.McqQueInfo= (req, res, next) =>{
  console.log(req.query['id'] );
  McqQue.find({ eventId:req.query['id'] },
        (err, mcq) => {
            if (!mcq)
                return res.status(200).json({ status: false, message: 'McqQue record not found.' });
            else
            {
                //console.log(company.companyAddress);
                return res.status(200).json({ status: true, mcqs : mcq});
            }
        }
    );
}


module.exports.getMcqQueByTitle = (req, res, next) =>{
  console.log(req.query.title)
  McqQue.findOne({ "title":req.query.title },
        (err, McqQue) => {
            if (!McqQue)
                return res.status(200).json({ status: false, message: 'McqQue record not found.' });
            else
            {

                return res.status(200).json({ status: true, McqQues : McqQue});
            }
        }
    );
}

