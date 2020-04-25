const mongoose = require('mongoose');

const RegForEvent = mongoose.model('regEvent');

module.exports.register = (req, res, next) => {
    var tc = new RegForEvent();
   console.log('inside regevent register methos');
    tc.eventName=req.body.eventName;
    tc.userName=req.body.userName;
    tc.marks=req.body.marks;
    tc.result=req.body.result;
    tc.total=req.body.total;
    tc.QOSRating=req.body.QOSRating;
    tc.jobOnRating=req.body.jobOnRating;

    tc.save((err, doc) => {
        if (!err)
           console.log(tc);

        else {
            console.log('error in regevent register method')
            return next(err);
        }

    });
}

module.exports.RegEventInfo= (req, res, next) =>{
 // console.log(req.query['id'] );
  RegForEvent.find({ userName:req.query['uname'],eventName:req.query['ename'] },
        (err, regForEvent) => {
            if (!regForEvent)
                return res.status(404).json({ status: false, message: 'regForEvent record not found.' });
            else
            {
                //console.log(company.companyAddress);
                return res.status(200).json({ status: true, regForEvents : regForEvent});
            }
        }
    );
}

module.exports.RegEventChecking= (req, res, next) =>{
  console.log(req.query.uname );
  console.log(req.query.ename );
    RegForEvent.findOne({ "userName":req.query.uname,"eventName":req.query.ename },
         (err, regForEvent) => {
             if (regForEvent)
             {
                  console.log('checking fails');
                  console.log(regForEvent)
                 return res.status(200).json({ status: 'false', message: 'regForEvent record not found.' });
             }
              else
             {
                console.log('checking success');
                console.log(regForEvent)
                 return res.status(200).json({ status: 'true'});
             }
         }
     );
 }


module.exports.updateResult= (req, res, next) =>{
  console.log(req.query.uname );
  console.log(req.query.ename );
    RegForEvent.findOne({ "userName":req.query.uname,"eventName":req.query.ename },
         (err, regForEvent) => {
             if (!regForEvent)
             {
                  console.log('checking fails');
                  console.log(regForEvent)
                 return res.status(200).json({ status: 'false', message: 'regForEvent record not found.' });
             }
              else
             {
                console.log('checking success');
                console.log(regForEvent)
                regForEvent.result+=req.body.result;
                regForEvent.save();
                 return res.status(200).json({ status: 'true',regForEvents:regForEvent});
             }
         }
     );
 }

 module.exports.updateRating= (req, res, next) =>{
  console.log(req.query.uname );
  console.log(req.query.ename );
 // console.log(req.body.QOSRating)
  //console.log(req.body.jobOnRating)
    RegForEvent.findOne({ "userName":req.query.uname,"eventName":req.query.ename },
         (err, regForEvent) => {
             if (!regForEvent)
             {
                  console.log('checking fails');
                  console.log(regForEvent)
                  return res.status(200).json({ status: 'false', message: 'regForEvent record not found.' });
             }
              else
             {
                console.log('checking success');
                console.log(regForEvent)
                console.log(req.query.qr)
                console.log(req.query.jr)
                regForEvent.QOSRating=req.query.qr;
                regForEvent.jobOnRating=req.query.jr;
                regForEvent.save();
                 return res.status(200).json({ status: 'true',regForEvents:regForEvent});
             }
         }
     );
 }

 module.exports.Result = (req, res, next) =>{
  console.log(req.query.ename)
  RegForEvent.find({ "eventName":req.query.ename },
        (err, regForEvent) => {
            if (!regForEvent)
                return res.status(404).json({ status: false, message: 'regForEvent record not found.' });
            else
            {

                return res.status(200).json({ status: true, regForEvents : regForEvent});
            }
        }
    );
}

module.exports.EventInfo= (req, res, next) =>{
  // console.log(req.query['id'] );
  console.log('in eventInfo')
   RegForEvent.find({},
         (err, regForEvent) => {
             if (!regForEvent)
                 return res.status(404).json({ status: false, message: 'regForEvent record not found.' });
             else
             {
                 //console.log(company.companyAddress);
                 return res.status(200).json({ status: true, regForEvents : regForEvent});
             }
         }
     );
 }
