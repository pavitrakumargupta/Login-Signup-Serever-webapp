const express = require("express"); //for creating and handling server
const bodyParser = require("body-parser"); //for getting inputs/////
var message, warning;
const loginRoute=require('./routes/login')
const signupRoute=require('./routes/singup')
  

const app = express(); //stored express in variable
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true })); //use to get urls of website
app.use(express.static("public"));
 
// sending   as a home and url path
  
app.use('/',loginRoute) 
app.use('/signup',signupRoute)

 
// started litening to the server
app.listen(process.nextTick.PORT||8000, () => {
  
  console.log("listening on post 8000");  
});
     