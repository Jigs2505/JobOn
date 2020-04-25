require('./config/config');
require('./models/db');
require('./config/passportConfig');

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const passport = require('passport');
const Company = mongoose.model('Company');
const Candidate=mongoose.model('Candidate');

const rtsIndex = require('./routes/index.router');

var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', rtsIndex);
app.use(express.static(__dirname));

var unique = require('uniqid');
let imageLink;
const imageStorage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      // alert(Date.now());
        let temp =  unique()+file.originalname ;
        imageLink = "/uploads/"+temp;
        cb(null,temp);
    }
});

const imageStore = multer({
    storage: imageStorage, limits: {
        fileSize: 60000000
    },
    fileFilter: ''
});



app.put('/imgsignupcmp',imageStore.single('img'),(req,res)=>{
  console.log(imageLink);

  var user = new Company();
    console.log('inside company controller');
    user.companyName = req.body.companyName;
    user.email = req.body.email;
    user.companyAddress = req.body.companyAddress;
    user.employerName = req.body.employerName;
    user.logo=imageLink;
    user.password = req.body.password;

    console.log(user);
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
  });

  app.put('/imgsignup',imageStore.single('img'),(req,res)=>{
    console.log(imageLink);

    var user = new Candidate();
      console.log('inside user controller');
      user.fullName = req.body.fullName;
      user.email = req.body.email;
      user.logo=imageLink;
      user.password = req.body.password;

      console.log(user);
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
    });

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});

// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));
