// requiring the model or all the ids to chech unique signup
const ids=require('./../models/idmodel')
// for sending and posting responses of signup
const express=require('express');
const md5 = require('md5');


// for not having unique id we have to creatae this
var message, warning;
   

// sending singup page 
  const getting_signup_page=async (req, res) => {
    // checking if signup page is loading with warning or just reloading
    if (warning) {
      res.render("signup", { warning: warning, message: message });
      warning = false;
    } else {
      res.render("signup", { warning: warning, message: message });
    }
  }
  
  // taking sigup data
const posting_signup_page=async (req, res) => {
// getting the id and password for checking uniquiness
  const entered_id = req.body.id;
  const entered_username = req.body.username;
  // 
  warning = true;


  // checking the id and username is already exist or not
  var existing_id = await ids.findOne({id :entered_id})
  if (existing_id==undefined){
    existing_id = await ids.findOne({username:entered_username})
  }//if it already exist then checking what is matching 
    if (existing_id){
  if (existing_id.id == entered_id) {
    message = "This id is alredy been registered";
  
  }
  else if(existing_id.username == entered_username) {
    message = "This username is already been taken";
  }else{warning=false}
  
  if (req.body.password != req.body.confirm_password) {
    message = "please match you password correctly";
    warning=true
  }}else{
    warning=false }


    //  if any warning rendering the page with warning
  if (warning) {
    res.redirect("/signup");
  }//if no warning then saving the id in mongoose server and rendring longin page
  else {
    res.redirect("/");


    var saving_id=req.body
    saving_id.password=md5(saving_id.password)

    
    try{
      const new_id= ids.create(saving_id) 
    }catch(err){
      console.log(err);
    }
  }


  }

//  handling the routes
const routerr= express.Router();
routerr
  .route("/")
  .get(getting_signup_page)
  .post(posting_signup_page) ;

// exporting the routes
  module.exports=routerr;