//create express app
const exp=require('express')
const app=exp()
require('dotenv').config() //process.env.PORT
const mongoClient=require('mongodb').MongoClient
//for connectinf frontend
const path=require('path')

//deploy react build in this server
app.use(exp.static(path.join(__dirname,"../client/build")))
//"../ means ouside of the folder"
//join is a mehod in path pckage which is used to connect frontend and backend. bild of the fronten has to be connnected

//to parse the body of the req
app.use(exp.json()) 

//connect to database
mongoClient.connect(process.env.DB_URL)
.then(client=>{
    //get db obj
    const blogdb=client.db('blogapp')
    //get collection obj
    const userscollection=blogdb.collection('userscollection')
    const articlescollection=blogdb.collection('articlescollection')
    const authorscollection=blogdb.collection('authorscollection')
    //share collection obj with express app
    app.set('userscollection',userscollection)
    app.set('articlescollection',articlescollection)
    app.set('authorscollection',authorscollection)
    //confirm db connection status
    console.log("DB connection success")
})
.catch(err=>console.log("err in db connection",err))




//import API routes
const userApp=require('./APIs/user-api')
const authorApp=require('./APIs/author-api')
const adminApp=require('./APIs/admin-api')


//if path starts with user-api ,send the req to userApp
app.use('/user-api',userApp)
//if path starts with admin-api,send req to adminApp
app.use('/admin-api',adminApp)
//if path starts with author-api,send req to author-App
app.use('/author-api',authorApp) 

//aftrer connecting backend and frontend even if we refresh the page we will not get error
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,"../client/build/index.html"))
})

//express error handler
app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err.message})
})
//assign port number
const port=process.env.PORT|| 5000;
app.listen(port,()=>console.log(`Server running on port ${port}`))