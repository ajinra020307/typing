//hamburger
let hamvisible=false
document.querySelector('.hamburger').addEventListener('click',ham);

function ham(){
  
  if(hamvisible==false){
    document.querySelector('.hambmenu').style.display="block"
    document.querySelector('.hamburger').style.zIndex=300;
    hamvisible=true
  }else if(hamvisible==true){
     document.querySelector('.hambmenu').style.display="none"
    document.querySelector('.hamburger').style.zIndex=1;
    hamvisible=false
  }
    

}

//loginclick

try{
 let login=document.querySelectorAll('.landsclick')
login.forEach((v,i)=>{
	v.addEventListener('click',loginclick);	
})

function loginclick(e){ 	
  console.log("Fd");
 	localStorage.setItem("landsclick",e.target.classList[1])	
}
}catch(err){

  
}