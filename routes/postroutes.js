const express=require('express');
const app=express();
const router=express.Router()

require('dotenv').config()
const jwt=require('jsonwebtoken')

const mongo=require('mongodb');
const mongoClient=mongo.MongoClient;
const url=process.env.mongourl;
const required={ useNewUrlParser: true, useUnifiedTopology: true }



router.post('/signup',(request,response)=>{

	let userdetail={
         "fullname":request.body.fullname,
         "email":request.body.email,
         "birthday":new Date(request.body.birthday),
         "gender":request.body.gender,
         "country":request.body.country,
         "password":request.body.password,
         "isverified":false,
         "signupon":new Date(),
         "languagepreference":request.body.language,
         "scores":{},
	}
	mongoClient.connect(url,required,(e,dbo)=>{

      if(e){
          response.send(e)
      }else{
          let db=dbo.db("typing")
          let collection=db.collection("userdetails")

          collection.find({"email":userdetail.email}).toArray((err,res)=>{

          if(err){
             response.send(err)
          }else{
            if(res.length){
              response.send("an user with this email already exists")  
           }else{
              collection.insertOne(userdetail,(err,res)=>{
              if(err){
                 response.send("problem in inserting data")
              }else{
                 response.send("successfully added")
              }
            })
          }}    
        })    
      }
   })
})


router.post('/login',(request,response)=>{

   let userdetail={
      "email":request.body.username,
      "password":request.body.password
   }
    
    mongoClient.connect(url,required,(e,dbo)=>{
      if(e){
           response.send("problem in loading data")
      }else{
           let db=dbo.db("typing")
           let collection=db.collection("userdetails")

           collection.find(userdetail).toArray((err,res)=>{
              if(err){
                 response.send(err)
              }else{
                 if(res.length){
            //.cookie("token","fd")
                    const jwttoken=jwt.sign({
                    "_id":res[0]._id,
                    "email":res[0].email
                    },process.env.jwtsecret)

                  response.cookie('token',jwttoken).render('account',{user:res}) 
              }else{
                   response.send("login failed") 
            }
          }
       })
    }})
 })


module.exports=router