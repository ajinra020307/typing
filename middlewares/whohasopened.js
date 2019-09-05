const jwt=require("jsonwebtoken")
require('dotenv').config()

const mongo=require('mongodb');
const mongoClient=mongo.MongoClient;
const url=process.env.mongourl;
const required={ useNewUrlParser: true, useUnifiedTopology: true }



function whohasopened(request,response,next){

 const token=request.cookies.token;
 let verified;
	 if(token){
	 	  verified=jwt.verify(token,process.env.jwtsecret)
	 }


	if(!token || !verified){
       next()
	}else{
	  mongoClient.connect(url,required,(error,dbo)=>{
		if(error){
	       response.send(error)
		}else{
				let db=dbo.db("typing");
				let collection=db.collection("userdetails");
					collection.find({"email":verified.email}).toArray((err,result)=>{
						if(err){
							next()
						}else if(result[0]){
							request.user=result
							next()
						}else{
							next()
						}
					})
		}
	  })
	}
}

module.exports=whohasopened