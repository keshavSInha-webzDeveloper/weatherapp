console.log("This message is print from js file");



function search(){
    document.querySelector('#k1').textContent="Loading...";
    document.querySelector('#k2').textContent="";
   searchInput=document.getElementById('inputValue').value

   fetch("/weather?address="+searchInput).then((result)=>{
    result.json().then((response)=>{

        
       if(response.error){
           document.querySelector('#k1').textContent=response.error
       }
       else{
           document.querySelector('#k1').textContent=response.location;
           document.querySelector('#k2').textContent=response.forcast;
           
       }
    })
})
   
}