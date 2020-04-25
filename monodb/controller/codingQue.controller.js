const mongoose = require('mongoose');

const CodingQue = mongoose.model('CodingQue');
const QueSet = mongoose.model('QueSet');

module.exports.register = (req, res, next) => {
    var tc = new CodingQue();
    tc.statement=req.body.statement;
    tc.title=req.body.title;
    tc.eventName=req.body.eventName;
    tc.marks=req.body.marks;
    tc.difficultyLevel=req.body.difficultyLevel;
    tc.testcases=req.body.testcases;
    console.log(req.body.testcases)
    tc.sampleIpOps=req.body.sampleIpOps;
    tc.relatedTopics=req.body.relatedTopics;
    tc.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            return next(err);
        }

    });

    QueSet.findOne({ eventName: req.body.eventName},
      (err, QueSet) => {
          if (!QueSet)
              return res.status(404).json({ status: false, message: 'QueSet record not found.' });
          else
          {
             temp=QueSet.codingQue;
             console.log(QueSet.codingQue);

             temp.push(tc)
             QueSet.save();
             // return res.status(200).json({ status: true, QueSetinfo :QueSet});
          }
      }
  );
}

module.exports.CodingQueInfo= (req, res, next) =>{
  CodingQue.findOne({ _id: req._id },
        (err, CodingQue) => {
            if (!CodingQue)
                return res.status(404).json({ status: false, message: 'CodingQue record not found.' });
            else
            {
                //console.log(company.companyAddress);
                return res.status(200).json({ status: true, CodingQues : CodingQue });
            }
        }
    );
}

module.exports.getQueByTitle = (req, res, next) =>{
  console.log(req.query.title)
  CodingQue.findOne({ "title":req.query.title },
        (err, CodingQue) => {
            if (!CodingQue)
                return res.status(200).json({ status: false, message: 'CodingQue record not found.' });
            else
            {

                return res.status(200).json({ status: true, CodingQues : CodingQue});
            }
        }
    );
}
