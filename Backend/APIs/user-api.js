//create user api app
const exp=require('express')
const userApp=exp.Router();
const expressAsyncHandler=require('express-async-handler')
const bcryptjs=require('bcryptjs')
const jsonwebtoken= require('jsonwebtoken');
require('dotenv').config()
const verifyToken=require('../Middlewares/verifyToken')

//middleware for userscollection obj-get userscollection obj
let userscollection;
let articlescollection;
userApp.use((req,res,next)=>{
    userscollection=req.app.get('userscollection')
    articlescollection=req.app.get('articlescollection')
    next()
})

//user registration
userApp.post('/user',expressAsyncHandler(async(req,res)=>{
    // res.send({message:"this is user api"})
    // console.log(req.body)

    //get user resource from client
    const newuser=req.body;
    //check for duplicate user based on username
    const dbuser=await userscollection.findOne({username:newuser.username})
    //if dbuser found in db
    if(dbuser!=null){
        res.send({message:"user existed"})
    }
    else{
        //hash the password
        const hashedPassword=await bcryptjs.hash(newuser.password,6)
        //replace plain password with hashed password
        newuser.password=hashedPassword;
        //create user
        await userscollection.insertOne(newuser)
        //send res
        res.send({message:"user created"})

    }
}))

//user login
userApp.post('/login',expressAsyncHandler(async(req,res)=>{
    //get user credentials
    const userCred=req.body;
    //verify user
    const dbUser=await userscollection.findOne({username:userCred.username})
    //if dbUser is null
    if(dbUser===null){
        res.send({message:"Invalid username"})
    }//if username is valid
    else{
        const status=await bcryptjs.compare(userCred.password,dbUser.password)
        //if passwords are not matched
        if(status===false){
            res.send({message:"Invalid password"})
        }
        else{
            //create JWT token
            const signedToken=jsonwebtoken.sign({username:dbUser.username},process.env.SECRET_KEY,{expiresIn:'1d'})
            //send token client as res
            res.send({message:"login successful",token:signedToken,user:dbUser})
        }
    }
}))

//get articles of all author 
userApp.get('/articles',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get articlescollection from express app
    const articlescollection=req.app.get('articlescollection')
    //get all articles
    let articlesList=await articlescollection.find({status:true}).toArray()
    //send res
    res.send({message:"articles",payload:articlesList})
}))

//post comments for an article by article id
userApp.post('/comment/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
     //get user comment obj
     const userComment=req.body;
     const articleIdFromUrl=req.params.articleId;
     //insert userComment obj to comments array of article by id
     let result=await articlescollection.updateOne(
        {articleId:articleIdFromUrl},
        {$addToSet:{comments:userComment}})
    console.log(result)
    res.send({message:"comment posted"})
    }))


//export userApp
module.exports=userApp;