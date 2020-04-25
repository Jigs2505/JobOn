const mongoose = require('mongoose');

const Testcase = mongoose.model('Testcase');

module.exports.register = (req, res, next) => {
    var tc = new Testcase();
    tc.input = req.body.input;
    tc.output = req.body.output;
    tc.explaination = req.body.explaination;

    tc.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            return next(err);
        }

    });
}

module.exports.testcaseInfo = (req, res, next) =>{
    Testcase.findOne({ _id: req._id },
        (err, testcase) => {
            if (!testcase)
                return res.status(404).json({ status: false, message: 'testcase record not found.' });
            else
            {
                //console.log(company.companyAddress);
                return res.status(200).json({ status: true, testcase : _.pick(testcase,['input','output','explaination']) });
            }
        }
    );
}
