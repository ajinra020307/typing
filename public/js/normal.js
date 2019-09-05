//popup

    let users=document.querySelectorAll('.user')
    users.forEach((v,i)=>{
      v.addEventListener('click', function(e) {
        document.querySelector('.accountpopup').style.display="block"
      });
    })
    let cancelimg=document.querySelector('.cancelimg').addEventListener('click', function(e) {
          document.querySelector('.accountpopup').style.display="none"
    });

    //logout
          document.querySelector('#logout').addEventListener('click',
           function(e) {
            Cookies.remove("token")
            window.location.replace("/")
          });

    window.addEventListener('load', init)

    let firsttime=true;
     let time={
       seconds:0,
       minutes:0
    }
      let t;
       let originalarray=[]
       let typedarray=[]
       let backspaceallow=true
     
      function init(){
         time.seconds=0;
         time.minutes=0 
        const content=document.querySelector('.typing_contentdiv').innerText
        document.querySelector('.typing_contentdiv').style.display="none"
        let contentsplittowords=content.split(" ")
        const typing_content=document.querySelector('.typing_content')
           
           originalarray=[]
           typing_content.innerText=""
           starttimer(false)
           firsttime=true
           time.seconds=0;
           time.minutes=0
           document.querySelector('.type_content').scrollTo(0,0);
           document.querySelector('.tryagain_popup').style.display="none"

         contentsplittowords.forEach((v,i)=>{
          let newheadspan=document.createElement('span')
          newheadspan.classList.add("head")

             for(let char=0;char<v.length;char++){        
                 let innerspan=document.createElement('span')
                 innerspan.classList.add('letter')
                 innerspan.innerText=v[char]
                 innerspan.style.backgroundColor="white"
                 newheadspan.appendChild(innerspan)
             }
             let space=document.createElement('span')
             space.innerText=" "
             space.style.borderBottom="1px solid red"
             newheadspan.appendChild(space)
             space.classList.add('letter')
             typing_content.appendChild(newheadspan)
         })
         typing_content.scrollTo(0,0)
         window.addEventListener('keydown',listenkeydown);
         //window.addEventListener('keydown',listenkeyup);

      }

       
       

       function listenkeydown(e){
       
            e.preventDefault()
          const allowedkeycodes=[32,48,49,50,51,52,53,53,55,56,57,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,96,97,98,99,100,101,102,103,104,105,188,190,191,222,59,219,221,61,173,110,107,192]
          let find=allowedkeycodes.indexOf(e.keyCode)
          
          let allspans=document.querySelectorAll('.letter');
          
          if(find!=-1 && firsttime==true){      
               starttimer(true)
               firsttime=false;
               allspans.forEach((v,i)=>{originalarray.push(v.innerText)})
          }
          
          if(find!=-1){
            backspaceallow=true
            check(allspans,originalarray,typedarray,e)
          }
          if(e.keyCode==8){
            backspacepressed(allspans,originalarray,typedarray,e,backspaceallow)
            backspaceallow=false
          }
       }
        
       function check(allspans,originalarray,typedarray,e){
            typedarray.push(e.key)
            scroll()
            drawborder(allspans[typedarray.length])
            instantcalc(true)
            
             
            if(typedarray.length==originalarray.length-1){
              finish(true)

              setTimeout(()=>{instantcalc(false)},1500)
              
            }
            const correctcolor="#aeea00"
            const wrongcolor="#ff7043"
            const wrongclass="wrong"
            const correctedcolor="#00acc1"

           
            for(let i=0;i<typedarray.length;i++){
              if(typedarray[i]==originalarray[i]){
                if(allspans[i].classList[1]=="wrong"){
                  allspans[i].style.backgroundColor=correctedcolor
                }else{
                    allspans[i].style.backgroundColor=correctcolor
                }
              }else{
                allspans[i].style.backgroundColor=wrongcolor
                allspans[i].classList.add(wrongclass)
              }
            }
       }

function backspacepressed(allspans,originalarray,typedarray,e,backspaceallow){
    if(backspaceallow==true){     
      typedarray.pop()
      allspans[typedarray.length].style.backgroundColor="white"
    }

  }


function starttimer(res){   

    if(res==true){
        t=setInterval(()=>{
            time.seconds+=1;
                if(time.seconds==60){
                    time.seconds=0;
                    time.minutes+=1
                  }
            document.querySelector('#seconds').innerText=time.seconds
            document.querySelector('#minutes').innerText=time.minutes
            instantcalc()
            },1000)
            return time
           }
           dectimelimit(time)
           if(res=="pause"){
             clearInterval(t)
           }
           if(res==false){
             clearInterval(t)
             return time

           }else{
             return time
           }
     }

     function finish(re){
      let finishedtime=starttimer(false)
      let wpmaccur=instantcalc(true)
      window.removeEventListener('keydown',listenkeydown)
      
      if(re==true){
        senddata(wpmaccur,finishedtime)
       }
     }
     
     function instantcalc(v){
        
        let time=starttimer("fd")
        let totalminutes=time.minutes+(time.seconds/60)
        let wpm=((typedarray.length-1)/5)/totalminutes
        let wrongletters=document.querySelectorAll('.wrong').length
        let noofletterscorrect=(typedarray.length-1)-wrongletters
        let accuracy=(noofletterscorrect/(typedarray.length-1)) *100
        if(accuracy<0){accuracy=0}
      
        document.querySelector('#wpm').innerText=Math.round(wpm)
        document.querySelector('#accuracy').innerText=Math.round(accuracy)

        if(v==false){
          document.querySelector('#wpm').innerText=0
          document.querySelector('#accuracy').innerText=0
        }
        return {wpm:wpm,accuracy:accuracy}
      
     }

     function dectimelimit(time){
      let limit=parseInt(document.querySelector('#timelimit').innerText)
          let minutes=time.minutes
          let seconds=time.seconds
          let totaltime=minutes*60 + seconds
          if(totaltime>=limit){
             window.removeEventListener('keydown',listenkeydown)
             document.querySelector('.tryagain_popup').style.display="flex"
          }
     }

function drawborder(span){
  try{
  span.style.borderBottom="2px solid blue"

  }catch(e){}
}
function removeborder(span){
  try{
    span.previousSibling.style.borderBottom="none"
  }catch(e){}
  
}


window.addEventListener('mousedown', stopselect);

function stopselect(e){
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}
function senddata(wpmacc,time){
   let minutes=time.minutes;
   let seconds=time.seconds
   let totalseconds=minutes*60 + seconds

          const levelname=document.querySelector('.slevelname').innerText;
          const levelid=document.querySelector('.slevelid').innerText;
          const nickname=document.querySelector('.snickname').innerText;
          const difficulty=document.querySelector('.sdifficulty').innerText;
          const timelimit=document.querySelector('.stimelimit').innerText;
          const threestaraccuracy=document.querySelector('.sthreestaraccuracy').innerText;
          const twostaraccuracy=document.querySelector('.stwostaraccuracy').innerText;
          const onestaraccuracy=document.querySelector('.sonestaraccuracy').innerText;
          const threestarwpm=document.querySelector('.sthreestarwpm').innerText;
          const twostarwpm=document.querySelector('.stwostarwpm').innerText;
          const onestarwpm=document.querySelector('.sonestarwpm').innerText;
          const token=Cookies.get("token")
          let stars;
          let passed;
           
          if(wpmacc.accuracy>parseInt(threestaraccuracy) && wpmacc.wpm>parseInt(threestarwpm)){
                stars=3
                passed=true
          }else if(wpmacc.accuracy>parseInt(twostaraccuracy) && wpmacc.wpm>parseInt(twostarwpm)){
             stars=2
             passed=true
          }else if(wpmacc.accuracy>parseInt(onestaraccuracy) && wpmacc.wpm>parseInt(onestarwpm)){
            stars=1
            passed=true
          }else{
            stars=0
            passed=false
          }
           popup(wpmacc.wpm,wpmacc.accuracy,totalseconds,stars)

          const dd={
              levelname:levelname,
              levelid:levelid,
              nickname:nickname,
              difficulty:difficulty,
              timelimit:timelimit,
              accuracy:Math.round(wpmacc.accuracy),
              wpm:Math.round(wpmacc.wpm),
              time:totalseconds,
              stars:stars,
              passed:passed,
              score:Math.round(wpmacc.accuracy*wpmacc.wpm)
             }
          fetch('/senduserscores',{
             method:"POST",
             headers:{
              'Accept':'application/json',
              'Content-type':'application/json'},
             body:JSON.stringify(dd)
          }).then(res=>res.json()).then(data=>{console.log(data);})
        
     }


  function popup(wpm,accuracy,time,stars){
    
    document.querySelector('.swpm').innerText=Math.round(wpm) + " wpm"
    let minutes=Math.floor(parseInt(time)/60)
    let seconds=Math.floor(parseInt(time)%60)
    document.querySelector('.stime').innerText=`${minutes}:${seconds}` + " mins"
    document.querySelector('.saccuracy').innerText=Math.round(accuracy) + "%"
    document.querySelector('.sstars img').src=`../img/${stars}star.png`
    setTimeout(()=>{
         document.querySelector('.scorespopup').style.display="block"
    },2500)
    if(stars==0){
      document.querySelector('#c').parentElement.href=""
      document.querySelector('#c').addEventListener('click', function(e) {
            document.querySelector('.scorespopup').style.display="none"
      });
    }
  }

document.querySelector('#retry').addEventListener('click', retry)
document.querySelector('#retryimg').addEventListener('click', retry)
let initialscroll=120
 let beforevalue=0

function retry(){

  typedarray=[]
  beforevalue=0
  initialscroll=120
  finish(false)
   document.querySelector('#wpm').innerText=0
  document.querySelector('#accuracy').innerText=0
  init()

}


 
 
function scroll(){
  let typediv=document.querySelector(".type_content")
  let para=document.querySelector('.typing_content')
  let lineheight=getComputedStyle(typediv).lineHeight
  lineheight=60
  let nooflines=typediv.scrollHeight/lineheight;
  let totalletters=originalarray.length;
  let lettersinoneline=Math.round(totalletters/nooflines)
    
  if(typedarray.length==(lettersinoneline+2)*2 
    || 
    typedarray.length%((lettersinoneline+2)*2)==0){
      console.log("s");
     if(typedarray.length>beforevalue){
      typediv.scrollTo(0,initialscroll)
      initialscroll+=120
     }

    beforevalue=typedarray.length
  }
}

let paused=false
let pausebtns=document.querySelectorAll('.pause');
pausebtns.forEach((v,i)=>{
  v.addEventListener('click',pause)
})
function pause(){
  
  if(paused==false){
    starttimer("pause")
    paused=true 
  }else if(paused==true){
    starttimer(true)
    paused=false
  }
     

}



