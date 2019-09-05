const express=require('express');
const app=express();
const router=express.Router()
const path=require("path");

require('dotenv').config()
const whohasopened=require("../middlewares/whohasopened")
const givelevelcontent=require("../middlewares/givelevelcontent")

const mongo=require('mongodb');
const mongoClient=mongo.MongoClient;
const url=process.env.mongourl
const required={ useNewUrlParser: true, useUnifiedTopology: true }



router.get('/',(request,response)=>{
   response.sendFile(path.resolve(__dirname,"../public","index.html"))
})

router.get("/login",whohasopened,(request,response)=>{
	let user=request.user
	if(user){
      response.render("account",{user})	
	}else{
		response.sendFile(path.resolve(__dirname,"../public/contents","login.html"))
	}
	
})

router.get('/signup',(request,response)=>{
	response.sendFile(path.resolve(__dirname,"../public/contents","signup.html"))
})

router.get("/starttyping",whohasopened,givelevelcontent,(request,response)=>{
   let user=request.user
   let levelcontent=request.levelcontent  
   	 response.render("starttyping",{
   	 	user,
   	 	levelcontent
   	 })   
})

router.get("/level/:id",whohasopened,givelevelcontent,(request,response)=>{
   let user=request.user 
   let levelcontent=request.levelcontent
   let whichlevel=request.params.id
  levelcontent.forEach((v,i)=>{
      if(whichlevel==v.levelname){       
             response.render(`${v.type}`,{
                 levelcontent:v,
                 user
              })  
      }
  })
})

router.post('/senduserscores',whohasopened,(request,response,)=>{
  let user =request.user;
  let details=request.body;
  let levelid=`scores.${details.levelname}`
  
  let score={
    name:details.levelname,
    levelid:details.levelid,
    accuracy:details.accuracy,
    wpm:details.wpm,
    stars:details.stars,
    timetaken:details.time,
    passed:details.passed,
    score:details.score
  }
if(user){
  mongoClient.connect(url,required,(err,dbo)=>{
     if(err){
      response.send(err)
     }else{
      let db=dbo.db("typing")
      let collection=db.collection('userdetails');
      let matched;
       for(let level in user[0].scores){
       	    if(level==details.levelname){
       	    	matched=true
       	     let x=user[0].scores[level]      		
       	      	  collection.updateOne({"email":user[0].email},{$set:{[levelid]:score},$inc:{levelscompleted:1}},(e,result)=>{
				           if(e){
				            response.send(e)
				           }else{
				            response.send(result)
				           }
				      })    	      	          	
       	    }
       }
       if(matched==undefined){
       	 collection.updateOne({"email":user[0].email},{$set:{[levelid]:score},$inc:{levelscompleted:1}},(e,result)=>{
				           if(e){
				            response.send(e)
				           }else{
				            response.send(result)
				           }
				      })
       }   
     }
  })
}
})

module.exports=router