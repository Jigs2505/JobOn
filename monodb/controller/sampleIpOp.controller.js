const mongoose = require('mongoose');

const SampleIpOp = mongoose.model('SampleIpOp');

module.exports.register = (req, res, next) => {
    var tc = new SampleIpOp();
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

module.exports.SampleIpOpInfo = (req, res, next) =>{
  SampleIpOp.findOne({ _id: req._id },
        (err, SampleIpOp) => {
            if (!SampleIpOp)
                return res.status(404).json({ status: false, message: 'SampleIpOp record not found.' });
            else
            {
                //console.log(company.companyAddress);
                return res.status(200).json({ status: true, SampleIpOp : _.pick(SampleIpOp,['input','output','explaination']) });
            }
        }
    );
}
