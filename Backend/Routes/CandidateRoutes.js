const router = require("express").Router();
const path = require('path');
var nodemailer = require('nodemailer');

router.post('/register', (req, res) =>
{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "yassine.amrani@um5r.ac.ma",
            pass: "ehjobpsulbxeppfe",
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    const mailOptions = {
        from: "yassine.amrani@um5r.ac.ma",
        to: req.body.email,
        subject: req.body.election_name + 'Registration',
        html: 'Congrats you have been registered for  ' + req.body.election_name + ' election.',
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            res.json({ status: 'error', message: 'mail error', data: null });
            console.log(err);
        } else {console.log(info);
        res.json({ status: 'success', message: 'mail sent successfully!!!', data: null });}
    });
})

module.exports = router;