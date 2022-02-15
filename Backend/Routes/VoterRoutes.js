const router = require("express").Router();
const bcrypt = require('bcrypt'); 
const path = require('path');
var nodemailer = require('nodemailer');

//Requiring models:
const Voter = require('../Models/Voter');
const utils = require("../utils/Utils");

router.post('/signin', async (req, res) =>
{
    try {
        const checkVoter = await Voter.findOne({email: req.body.email});
        if(checkVoter)
        {
            if(bcrypt.compareSync(req.body.password, checkVoter.password) && checkVoter.email == req.body.email)
            {
                res.json({status:"success", message: "Voter found!", data:{email: checkVoter.email, election_address: checkVoter.election_address}});
            }
            else
            {
                res.json({status:"error", message: "Invalid password!", data:null});
            }
        }
        else
        {
            res.json({status:"error", message: "Invalid email!", data:null});
        }
    } catch (error) {
        console.log(error)
    }
})

router.post('/register', async (req, res) =>
{
    try
    {
        const checkVoter = await Voter.findOne({email: req.body.email});
        if(!checkVoter)
        {
            const password = utils.randomString(12);
            await Voter.create({email: req.body.email, password: password, election_address: req.body.election_address});
            const checkNewVoter = await Voter.findOne({email: req.body.email});
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
                html: 
                req.body.election_description +
                '<br>Your voting id is:' +
                checkNewVoter.email +
                '<br>' +
                'Your password is:' +
                password +
                '<br><a href="http://localhost:3001/homepage">Click here to visit the website</a>',
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    res.json({ status: 'error', message: 'mail error', data: null });
                    console.log(err);
                } else {
                    console.log(info);
                    res.json({status: "success", message: "Voter added successfully!", data:{id: checkNewVoter._id}});
            }});
            
        }
        else
        {
            res.json({status: "error", message: "Voter already exists", data:null});
        }
    }
    catch(error)
    {
        console.log(error)
    }
})

router.get('/all/:address', async (req, res) =>
{
    try {
        const voters = await Voter.find({election_address: req.params.address});
        res.json({status: "success", message: "Here are the voters for that address", data: voters})
    } catch (error) {
        console.log(error)
    }
})

router.post('/resultMail', async (req, res) =>
{
    const voters = await Voter.find({election_address: req.body.election_address})
    const election_name = req.body.election_name;

	const winner_candidate = req.body.winner_candidate;

	for (let voter of voters) {
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
			from: process.env.EMAIL, // sender address

            to: voter.email, // list of receivers

			subject: election_name + ' results', // Subject line

			html:
				'The results of ' +
				election_name +
				' are out.<br>The winner candidate is: <b>' +
				winner_candidate +
				'</b>.',
		};

		transporter.sendMail(mailOptions, function (err, info) {
			if (err) {
				//res.json({ status: 'error', message: 'mail error', data: null });
                console.log(err);
			} else console.log(info);

		});
	}

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
		from: process.env.EMAIL, // sender address

		to: req.body.candidate_email, // list of receivers

		subject: req.body.election_name + ' results !!!', // Subject line

		html: 'Congratulations you won ' + req.body.election_name + ' election.', // plain text body
	};

	transporter.sendMail(mailOptions, function (err, info) {
		if (err) {
			//res.json({ status: 'error', message: 'mail error', data: null });

			console.log(err);
		} else console.log(info);

	});
    res.json({ status: 'success', message: 'mails sent successfully!!!', data: null });
			
})

router.delete('/:address/:email', async (req, res) => 
{
    console.log({email: req.params.email, election_address: req.params.address})
    await Voter.deleteOne({email: req.params.email, election_address: req.params.address});
    const checkVoter = await Voter.findOne({email: req.params.email, election_address: req.params.address});
    if(!checkVoter)
    {
        res.json({status: "success", message: "Voter deleted successfully", data: null})
    }
    else
    {
        console.log(chackVoter)
        res.json({status: "error", message: "Error in deleting Voter", data: null})
    }
})

module.exports = router;