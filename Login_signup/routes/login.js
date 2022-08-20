const express=require('express')
const ids=require('./../models/idmodel')
const md5=require('md5')
var message, warning;

const getting_loginpage=(req, res) => {
    if (warning) {
      res.render("login", { warning: warning, message: message });
      warning = false;
    } else {
      res.render("login", { warning: warning, message: "" });
    }
  };


  const posting_longin_page=async(req, res) => {
    //getting id and password from input of login page
    var id = req.body.id;
    var password = md5(req.body.password);
    warning = true;
    // var my_id
    //checking if id and password entered is registered or not
    var my_id = await ids.findOne({id :id})
    if (my_id){
      if(my_id.password!=password){
        my_id=undefined
      }
    }
 
    my_id?warning=false:warning=true
  
    // if id or password didn't match type again or if it is correct then getting homepage
   
    if (warning) {
      message = "please enter correct id and password";
      res.redirect("/");
    } else {
      res.render("homepage");
    }
  }


const routerr= express.Router();
routerr
  .route('/')
  .get(getting_loginpage)
  .post(posting_longin_page);
routerr
  .route('/login')
  .get(getting_loginpage);

module.exports=routerr