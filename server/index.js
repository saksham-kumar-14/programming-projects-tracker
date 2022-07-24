const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config()


const userModel = require("./models/user");

// mongodb+srv://Saksham:saksham@cluster0.efqujth.mongodb.net/test
mongoose.connect("mongodb+srv://Saksham:saksham@cluster0.efqujth.mongodb.net/?retryWrites=true&w=majority")

app.use(cors());
app.use(express.json());

app.get("/getUsers", (req,res)=>{
    userModel.find({}, (err,result)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(result);
        }
    })
});


app.post("/createUser", async(req,res)=>{

    try{
        const newPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        });
        await newUser.save();
        const token = jwt.sign({
            name: req.body.name,
            email: req.body.email,
            tracks: []
        }, process.env.JWT_SECRET_KEY);
        return res.json({status:"ok", user:token});
    }catch{
        return res.json({status:404, user:false});
    }
});

app.post("/login", async(req,res)=>{
    const user = await userModel.findOne({
        email: req.body.email,
    });

    const isPasswordValid = bcrypt.compare(req.body.password, user.password)

    if(user && isPasswordValid){
        const token = jwt.sign({
            name: user.name,
            email: user.email,
            tracks: user.tracks
        }, process.env.JWT_SECRET_KEY);
        return res.json({ status:"ok", user:token });
    }else{
        return res.json({ status:404, user:false })
    }
})

app.get("/verifyUser", async (req,res)=>{
    const userToken = req.headers["user-token"];

    try{
        const decoded = jwt.decode(userToken);
        const user = await userModel.findOne({
            name: decoded.name,
            email: decoded.email
        });


        if (user) {
            res.json({ status:"ok", user:user })
        }else{
            res.json({ status:404, user:false })
        }
    }catch{
        res.json({ status:404, user:false })
    }

});

// reload the page after making an API connection to this route. It doesn't return the user object as such.
app.post("/updateUser", async (req,res)=>{

    try{
        const user = await userModel.findOneAndUpdate(
            { email: req.body.email }, 
            { track: req.body.track }
        );
    
        if (user) {
            res.json({ status:"ok", updated: true })
        }else {
            res.json({ status:404, updated: false })
        }
    }catch{
        res.json({ status:404, updated:false })
    }

})

app.post("/deleteUser", (req,res)=>{
    userModel.deleteOne(
        {email: req.body.email}
    ).then(()=>{
        return res.json({ status:"ok", deleted:true });
    }).catch(()=>{
        return res.json({ status:404, deleted:false });
    })
});




app.listen(3001, ()=>{
    console.log("The server is running at http://localhost:3001");
})