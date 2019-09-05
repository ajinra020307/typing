let selectcountry=document.querySelector('#country')

fetch("../country.json").then((res)=>res.json()).then(data=>{
	data.forEach((v,i)=>{
		let newoption=document.createElement("option")
		newoption.innerText=v.name;
		newoption.value=v.name
		selectcountry.appendChild(newoption)
	})
})

//opena nd close popup

document.querySelector('.password').addEventListener('focus',popup)
let firstpopup=true
function popup(e){
	if(firstpopup==true){
		 document.querySelector('.popup').style.display="flex"
		 firstpopup=false
	}
  
}
document.querySelector('.popup img').addEventListener('click',hidepopup)
function hidepopup(e){
	document.querySelector('.popup').style.display="none"
}

let password = document.getElementById("pswd")
let confirm_password = document.getElementById("npswd");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;