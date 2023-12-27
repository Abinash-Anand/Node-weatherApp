const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector("#message-2")


const fetchAPI = function(location){

    try {
        fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)+'').then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    messageOne.innerText= data.error;
                    messageTwo.innerText=''
                    messageOne.style.color='red'

                }else if(location===''){
                    // messageOne.style.color="red"
                    messageOne.innerText='Please provide a location!!'
                    messageOne.style.color='red'
                    
                }
                else{
                   
                    messageOne.innerText='';
                    messageTwo.style.backgroundColor="#8ede91cc"
                    messageTwo.style.maxWidth="25em"
                    messageTwo.innerText=`The current Temp in ${data[1].address} is ${data[1].currentTemp} but feels like: ${data[1].feelsLike}`;
                    
                }
            })
        })
    } catch (error) {
        console.log(error);
    }
 
}
 


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;
    messageOne.innerText="Loading..." ;
    messageTwo.innerText=''
    messageOne.style.color="#212121"
    messageTwo.style.backgroundColor='white'
    fetchAPI(location)
})