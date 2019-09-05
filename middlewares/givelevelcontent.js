const jwt=require("jsonwebtoken")
require('dotenv').config()

const mongo=require('mongodb');
const mongoClient=mongo.MongoClient;
const url=process.env.mongourl;
const required={ useNewUrlParser: true, useUnifiedTopology: true }



function givelevelcontent(request,response,next){
	 mongoClient.connect(url,required,(error,dbo)=>{
	 	if(error){
	 		next()
	 	}else{
	 		let db=dbo.db("typing")
	 		let collection=db.collection("levelcontent");
	 		collection.find({}).toArray((err,result)=>{
	 			if(err){
	 				next()
	 			}else{
	 				request.levelcontent=result;
	 				next()
	 			}
	 			
	 		})
	 	}
	 })
}

module.exports=givelevelcontent