const express = require('express')
const bossRouters = express.Router(); 
const db = require('../db/boosdb')
const User = require('../db/user'); 
const jwt = require('jsonwebtoken'); 
const secret = "jnjkcdncjkec"
const bcrypt = require('bcrypt'); 





const auth = function (req, res, next) {
  const token = req.headers["acces-token"];
  if (!token) {
    res.json({ message: "you are not auth to go here", isAuth: false });
  } else {
    jwt.verify(token,secret, function (err, decoded) {
      if (err) {
        res.json({ message: "your token is wrong", isAuth: false });
      } else {
        req.username = decoded;
        next();
      }
    });
  }
};



bossRouters.post("/register", async (req, res) => {
  try {
    console.log(req.body); 
    const verify = await User.findOne({ email : req.body.email });
    if (verify) {
      res.json({
        message:
          "this username already exists try to register with a differnet one!",
      });
    } else {
      const newUser = await User.create(req.body);
      res.json({ message: "done!" });
    }
  } catch (error) {
    console.log(error);
  }
});


bossRouters.post("/login", async (req, res) => {
  try {
    console.log(req.body) 
    const verify = await User.findOne({ email: req.body.email });
    if (verify) {
      bcrypt.compare(
        req.body.password,
        verify.password,
        function (err, result) {
          if (err) {
            res.json({ message: "an error occured please try again" });
          }
          if (result) {
            const token = jwt.sign({username: verify.username }, secret);
            res.json({ isAuth: true, token: token, user: verify });
          } else {
            res.json({ message: "your password is wrong" });
          }
        }
      );
    } else {
      res.json({ message: "there is no such a user with that name!" });
    }
  } catch (err) {
    console.log(err);
  }
});


bossRouters.post('/post',async (req,res)=>{
try {
const postedValue = await db.create(req.body);
res.redirect('http://localhost:3000/add') ; 
} 
catch (error) {
console.log(error)    
}
});


bossRouters.get('/get', async (req,res)=>{
try {
const foundValues = await db.find() ; 
res.send(foundValues)   
} catch (error) {
  console.log(error)  
}
}); 


bossRouters.delete('/delete/:id', async(req,res)=>{
try{
const deletedValue = await db.findByIdAndDelete({_id : req.params.id}); 
res.redirect('http://localhost:3000/list')
} 
catch (error) {
    console.log(error)
}
}); 

bossRouters.put('/put/:id', async(req,res)=>{
try {
const updated = await db.updateOne({_id : req.params.id},{
    $set : {
    name : req.body.name , 
    position : req.body.position , 
    salary : req.body.salary , 
    note : req.body.salary ,
    }

})  
res.send('done')  
} 
catch (error) {
  console.log(error)   
 }   
})

bossRouters.get('/get/:id',async (req,res)=>{
try {
const singleElement = await db.findById({_id : req.params.id })
res.send(singleElement)
} 
catch (error) {
  console.log(error)
}
}); 

bossRouters.get('/home', auth ,async(req,res)=>{
try {
res.json({ username : req.username });   
} 
catch(error) {
console.log(error)
}
}); 




module.exports = bossRouters ; 