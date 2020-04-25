const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Company = mongoose.model('Company');

module.exports.register = (req, res, next) => {
    var user = new Company();
    user.companyName = req.body.companyName;
    user.email = req.body.email;
    user.companyAddress = req.body.companyAddress;
    user.employerName = req.body.employerName;
    user.password = req.body.password;

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

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication

    passport.authenticate('company', (err, user, info) => {
       console.log('inside company auth');
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else
        {
          console.log("error is here\n");
           return res.status(404).json(info);
        }
    })(req, res);
}

module.exports.companyProfile = (req, res, next) =>{
    Company.findOne({ _id: req._id },
        (err, company) => {
            if (!company)
                return res.status(404).json({ status: false, message: 'Company record not found.' });
            else
            {
                console.log(company.companyAddress);
                return res.status(200).json({ status: true, companys :company});
            }
        }
    );
}

module.exports.companyProfileById = (req, res, next) =>{
  Company.find({ _id: req.query['id']  },
      (err, company) => {
          if (!company)
              return res.status(404).json({ status: false, message: 'Company record not found.' });
          else
          {
              console.log(company.companyAddress);
              return res.status(200).json({ status: true, companys :company});
          }
      }
  );
}
