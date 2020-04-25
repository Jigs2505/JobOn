const mongoose = require('mongoose');
const Event = mongoose.model('Event');
const Queset=mongoose.model('QueSet');

module.exports.register = (req, res, next) => {
    var user = new Event();
    user.eventName = req.body.eventName;
    user.strength = req.body.strength;
    user.companyId = req.body.companyId;
    user.regStartDate = req.body.regStartDate;
    user.eventDate = req.body.eventDate;
    user.status = req.body.status;
   // user.queSet = req.body.queSet;

    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}



module.exports.eventInfo = (req, res, next) =>{
  Event.findOne({ _id: req._id },
        (err, event) => {
            if (!event)
                return res.status(404).json({ status: false, message: 'event record not found.' });
            else
            {

                return res.status(200).json({ status: true, events : event});
            }
        }
    );
}

module.exports.eventStatus = (req, res, next) =>{
  console.log(req.query.status)
    Event.find({ status: req.query.status },
          (err, event) => {
              if (!event)
                  return res.status(404).json({ status: false, message: 'event record not found.' });
              else
              {

                  return res.status(200).json({ status: true, events : event});
              }
          }
      );
  }

  module.exports.eventForCandidate = (req, res, next) =>{
    currentDate=Date.now();
    Event.find({ status: "UPLOADED"/*,regStartDate:{$lte:currentDate},eventDate:{$gt:currentDate} */},
          (err, event) => {
              if (!event)
                  return res.status(404).json({ status: false, message: 'event record not found.' });
              else
              {
                  console.log(event)
                  return res.status(200).json({ status: true, events : event});
              }
          }
      );
  }

  module.exports.CheckForEvent = (req, res, next) =>{
    var currentDate=Date.now();
    console.log(currentDate)
    console.log(req.query.ename)
    Event.findOne({  "eventName":req.query.ename,"status": "UPLOADED","eventDate":currentDate},
          (err, event) => {
              if (!event)
                  return res.status(200).json({ status: false, message: 'event record not found.' });
              else
              {
                  console.log(event)
                  console.log(event.eventDate == currentDate)
                  console.log("in else")
                  return res.status(200).json({ status: true, events : event});
              }
          }
      );
  }

  module.exports.getEventByName = (req, res, next) =>{
    console.log(req.query.ename)
    Queset.findOne({ "eventName":req.query.ename },
          (err, Queset) => {
              if (!Queset)
                  return res.status(404).json({ status: false, message: 'Queset record not found.' });
              else
              {

                  return res.status(200).json({ status: true, Quesets : Queset});
              }
          }
      );
  }


  module.exports.updateEventStatus = (req, res, next) =>{
    console.log(req.query.status)
    console.log(req.query.ename)
    Event.findOne({ "eventName":req.query.ename},
          (err, event) => {
              if (!event)
                  return res.status(404).json({ status: false, message: 'event record not found.' });
              else
              {
                  event.status=req.query.status;
                  event.save();
                  return res.status(200).json({ status: true, events : event});
              }
          }
      );
  }

  module.exports.AllEvents= (req, res, next) =>{
    // console.log(req.query['id'] );
    console.log('in eventInfo')
    Event.find({},
           (err, event) => {
               if (!event)
                   return res.status(404).json({ status: false, message: 'event record not found.' });
               else
               {
                   //console.log(company.companyAddress);
                   return res.status(200).json({ status: true, events : event});
               }
           }
       );
   }

