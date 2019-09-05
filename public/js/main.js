//typewriter

window.addEventListener('load', function(e) {
			start()
		});

		function start(){
			const typewritervalues=["For Free",
                                    "Within a Month",
                                    "In a Fun Way",
                                    ];
			const typewriterlength=typewritervalues.length;
			const span=document.querySelector('#typehere');
			let count=0;
            
            if(count<typewriterlength-1){
            	write(count,typewritervalues,span)
            }
		}

		function write(co,ar,sp){	
			if(co>ar.length-1){
				start()
			}else{
				 let currentvalue=ar[co]
                 let currentarray=currentvalue.split("")
                 let inc=300;
                 let finalinc=300*(currentarray.length) + 3000
              
             for(let i=0;i<currentarray.length;i++){
          	 
            	 setTimeout(()=>{
            	 	let newspan=document.createElement("span")
            	 	newspan.innerText=currentarray[i]
           	        sp.appendChild(newspan)
                 },inc)

                 inc+=300
             }

                 setTimeout(function() {
                 	deleete(co,sp,ar)
                 }, finalinc);	
             }
		}

		function deleete(co,sp,ar){
            let children=sp.children
            let inc=100
            let finalinc=100*children.length;
            
            for(let i=children.length-1;i>=0;i--){
            	setTimeout(function() {
            		sp.removeChild(children[i])
            	}, inc);
            	inc+=100        
            }
            setTimeout(function() {
            	co+=1;
            	write(co,ar,sp)
            }, finalinc);
		}


//hamburger


//getstarted
document.querySelector('.getstartbtn').addEventListener('click', function(e) {
    document.querySelector('.clickgetstarted').style.display="flex"
});
document.querySelector('.clickgetstarted img').addEventListener('click', function(e) {
    document.querySelector('.clickgetstarted').style.display="none"
});