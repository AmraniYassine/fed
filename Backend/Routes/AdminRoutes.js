const router = require("express").Router();
const bcrypt = require('bcrypt'); 
const path = require('path');

//Requiring models:
const Admin = require('../Models/Admin');

router.get('/', (req,res) =>
{
    res.json("Welcome to Admin Routes")
})

router.post('/register', async (req, res) =>
{
    try {
        const checkAdmin = await Admin.findOne({email: req.body.email});
        if(checkAdmin)
        {
            res.json({status: "error", message: "Admin already exists", data:null});
        }
        await Admin.create({email: req.body.email, password: req.body.password});
        const checkAdminCreated =  await Admin.findOne({email: req.body.email});
        res.json({status: "success", message: "Admin added successfully!", data:{id: checkAdminCreated._id}});
        
    } catch (error) {
        console.log(error)
    }
    
})

router.post('/signin', async (req, res) =>
{
    try {
        const checkAdmin = await Admin.findOne({email: req.body.email});
        if(checkAdmin)
        {
            if(bcrypt.compareSync(req.body.password, checkAdmin.password) && checkAdmin.email == req.body.email)
            {
                res.json({status:"success", message: "Admin found!", data:{id: checkAdmin._id, email: checkAdmin.email}});
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


module.exports = router;