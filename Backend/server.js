//Requiring modules
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors")

//Requiring Routes
const adminRoute = require("./Routes/AdminRoutes")
const voterRoute = require("./Routes/VoterRoutes")
const candidateRoutes = require("./Routes/CandidateRoutes")

//App using our dependencies
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({origin: '*'}))
/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"),
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
    next()
  })*/
app.use("/admin",adminRoute)
app.use("/voter",voterRoute)
app.use("/candidate",candidateRoutes)
app.listen(3000, ()=>
{
    console.log('hello from port 3000')
})