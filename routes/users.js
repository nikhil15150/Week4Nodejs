var express = require('express');
const bodyParser = require('body-parser');

var User=require('../models/users');

var passport=require('passport');
var router = express.Router();
router.use(bodyParser.json());
var authenticate=require('../authenticate');
//////////////////////List all users only to admin users/////////////
router.get('/',authenticate.verifyUser,authenticate.verifyAdmin,((req,res,next)=>{
      User.find({}).then((user)=>{
        if(user)
        {
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json({status:true,users:user});
        }
        else{
            res.statusCode=400;
            res.setHeader('Content-Type','application/json');
            res.json({status:false,message:"No Users present"});
        }
      })
      .catch((err)=>{
          next(err);
      })
}));



//////////////New user signup



router.post('/signup',(req,res,next)=>{
  User.register( new User ({username:req.body.username}),req.body.password,(err,user)=>{
    if(err)
    {
      res.statusCode=400;
      res.header('Content-Type','application/Type');
      res.json ({success:false,message:err});
    }
    else
    { 
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        else
        {
          passport.authenticate('local')(req,res,()=>{
          res.statusCode=200;
          res.header('Content-Type','application/Type');
          res.json ({success:true,message:"user created successfully"});
         })
        }
      });
      

    }
  });
});  
router.post('/login',passport.authenticate('local'),(req,res,next)=>{
 
  var token=authenticate.getToken({_id:req.user._id});
  res.statusCode=200;
  res.setHeader("Content-Type",'application/json');
  res.json({success:true,token:token,message:"you are authenticated"});
});
  
router.get('/logout',(req,res,next)=>{
    if(req.session.user)
    {
      req.session.destroy();
      res.clearCookie('session-id');
      res.redirect('/');

    }
    else{
      var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
    }
})
module.exports = router;
