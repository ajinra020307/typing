const express=require("express");
const app=express();
const path=require("path");
const cookieparser=require('cookie-parser')

require("dotenv").config()

const mongo=require('mongodb');
const mongoClient=mongo.MongoClient;
const url=process.env.mongourl;
const required={ useNewUrlParser: true, useUnifiedTopology: true }

//imporrtng routes
const routes=require("./routes/routes")
const postroutes=require('./routes/postroutes');

//express middlewares
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieparser())

//setting template engine

app.set('view engine','ejs')

//routes
 
app.use('/',routes)
app.use('/',postroutes)


let port=process.env.PORT || 80

app.listen(port,()=>{
	console.log('listening on port ' + port);
})

mongoClient.connect(url,required,(error,dbo)=>{
	console.log("databse listening");
})

