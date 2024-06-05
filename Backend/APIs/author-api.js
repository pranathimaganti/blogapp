//create author api app
const exp=require('express')
const authorApp=exp.Router();
const expressAsyncHandler=require('express-async-handler')
const bcryptjs=require('bcryptjs')
const jsonwebtoken= require('jsonwebtoken');

const verifyToken=require('../Middlewares/verifyToken')

//middleware for userscollection obj-get userscollection obj
let authorscollection;
let articlescollection;
authorApp.use((req,res,next)=>{
    authorscollection=req.app.get('authorscollection')
    articlescollection=req.app.get('articlescollection')
    next()
})

//registration
authorApp.post('/author',expressAsyncHandler(async(req,res)=>{
    // res.send({message:"this is author api"})
    // console.log(req.body)

    //get author resource from client
    const newauthor=req.body;
    //check for duplicate user based on username
    const dbuser=await authorscollection.findOne({username:newauthor.username})
    //if dbuser found in db
    if(dbuser!=null){
        res.send({message:"author existed"})
    }
    else{
        //hash the password
        const hashedPassword=await bcryptjs.hash(newauthor.password,6)
        //replace plain password wi5h hashed password
        newauthor.password=hashedPassword;
        //create author
        await authorscollection.insertOne(newauthor)
        //send res
        res.send({message:"author created"})

    }
}))

//author login
authorApp.post('/login',expressAsyncHandler(async(req,res)=>{
    //get author credentials
    const userCred=req.body;
    //verify author
    const dbUser=await authorscollection.findOne({username:userCred.username})
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

//get articles of all authors
authorApp.get('/articles/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get authors username from url
    const authorName=req.params.username;
    //get all articles whose status is true
    let articlesList=await articlescollection.find({status:true,username:authorName}).toArray()
    //send res
    res.send({message:"articles",payload:articlesList})
}))


//adding article by author
authorApp.post('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get new article from client
    const newArticle=req.body;
    // console.log(newArticle)
    //duplicate article not possible beacuse only one article at one timestamp
    //post to articles collection
    await articlescollection.insertOne(newArticle)
    //send res
    res.send({message:"new article created"})
}))

//modify article by author
authorApp.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get modified article from client
    const modifiedArticle=req.body;
    //update by articleId
    let result=await articlescollection.updateOne({articleId:modifiedArticle.articleId},{$set:modifiedArticle})
    console.log(result)
    res.send({message:"article modified"})
}))

//soft delete of an article by author
authorApp.put('/article/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get articleId from url
    const articleIdFromUrl=req.params.articleId;
    //get article
    const articleToDelete=req.body;
    //update status of article to false
    await articlescollection.updateOne({articleId:articleIdFromUrl},{$set:{...articleToDelete,status:false}})
    res.send({message:"Article removed"})
    
}))

//export userApp
module.exports=authorApp;