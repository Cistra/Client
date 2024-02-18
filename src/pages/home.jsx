
import { Link } from 'react-router-dom'
import user from '../assets/user.png'
import burgermenu from '../assets/burger-menu.png'
import send from '../assets/send-button.png'
import meet from '../assets/meeting.png'
import patent from '../assets/patent.png'
import feature from '../assets/features.png'
import ai from '../assets/ai.png'
import close from '../assets/close.png'
import cancel from '../assets/cancel.png'
import {Form }from 'react-bootstrap';
import './styles.css'
import { useState,useEffect} from 'react'
import axios from 'axios'
function Home(){
document.addEventListener('DOMContentLoaded', function() { });
  const API_Url=import.meta.env.VITE_APIURL
  const [resl,setresl]=useState([]);
  useEffect(()=>{
    const user =JSON.parse(localStorage.getItem("userInfo"));
    if (user && user.token){
      getData(user.token)
    }
  },[]);
 const getData= async (token) =>{
    try{
      const config={
        headers:{
          Authorization:token
        }
      }
      const response= await axios.get(`${API_Url}/home`,config);
      if(response.data ==="Invalid Token"){
        alert("login again")
      }
      else if(response.data==="Server busy"){
         alert("Unauthorized login")
      }
      else if(response?.status){
        setresl(response.data);
      }
    }
    catch(e){console.log(e)}

  }
  const [formdata,setFormdata]=useState({
    prompt:""
});

const handlechange=(e)=>{
const {name,value}=e.target;
setFormdata({...formdata, [name]:value})
}
  
  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      await addmessage();
    }
  }
const addmessage=async()=>{
    try{
    const area=document.querySelector("textarea");
    // console.log(message);
    const res =await axios.post(`${API_Url}/home/p`,formdata);
    var message=res.data;
      
  
   //if(message.trim()!=''){
      var div=document.getElementById("messages");
      // var divtemp= document.createElement('div');
      // divtemp.textContent=`user:-${area.value}`;
      var divtemp= document.createElement('div');
      divtemp.textContent=`3By3:- ${message}`;
      if (div) {
        div.appendChild(divtemp);
        area.value = '';
        adjust(area);
    } else {
        console.error("Container element not found.");}
     //  }
  }
catch(e){
  console.log(e)
}
  };
  function adjust(area){
    area.style.height = "auto";
    area.style.height =area.scrollHeight+'px';
  
  }
const menu=()=>{
  const sb=document.getElementById('sb');
  const textare=document.getElementById('textdiv');
  textare.style.display='none';
  sb.style.display='block';}

const fun=()=>{
  const sb=document.getElementById('sb');
  const textare=document.getElementById('textdiv');
  textare.style.display='block';
  sb.style.display="none";
}
  const lis = document.querySelectorAll('#sb li');

  lis.forEach(li => {
      li.addEventListener('click', function () {
          // Reset font size of all lis
          lis.forEach(item => {
              item.style.fontSize = ''; 
              item.style.transition = 'font-size 0.3s ease';// Reset font size to default
          });

          // Increase font size of the clicked li
          this.style.fontSize = '30px';
      });
  });
//  


const placeholderText = " your prompt goes here.  ";
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');
  let placeholderIndex = 0;

  useEffect(() => {
    const typingInterval = setInterval(() => {
      // Add the next character from the original placeholder text
      setCurrentPlaceholder(prevPlaceholder => prevPlaceholder + placeholderText[placeholderIndex]);
      // Move to the next character in the original placeholder text
      placeholderIndex = (placeholderIndex + 1) % placeholderText.length;
      if(placeholderIndex===22){setCurrentPlaceholder('|')}
    }, 150); // Adjust the interval as needed

    return () => clearInterval(typingInterval);
  }, []);
    return(
        <>
        <div className=" rounded-b-3xl bg-white text-black w-{3/4} h-10 flex items-center">
             <span className="ml-3" id="menu"><img src={burgermenu} onClick={menu} className='w-8'></img> </span>
          <span className="flex justify-end ml-auto"> 
          
          { !isNaN(resl) ?(
    <button className="mr-10 bg-blue-300 pr-2 pl-2 rounded-full h-8 mt-1">
        <Link to="/signup">Sign in/Sign up</Link>
    </button>
) : (
    <span className='mt-1 text-2xl mr-3'>{resl.name}</span>
)}

          <img src={user} className=" mr-4 w-10 rounded-xl"></img>
          </span>
          </div>
          <ul id='sb' >
             <button id="xb" onClick={fun} className='mt-10 '><img src={cancel}className='w-5'></img></button>
             <li > <img src={ai} className='inline  w-8'></img> AI</li>
             <li> <img src={feature} className='inline  w-8'></img> Feature</li>
             <li> <img src={meet} className='inline  w-8'></img> Group</li>
             <li> <img src={patent} className='inline  w-8'></img> Patent</li> 
          </ul>
          <div id='textdiv'>
          <div className='mt-5 ml-5 mb-5 text-3xl cursor-pointer select-none' id='headtext'>
          Artificial intelligence (AI) has revolutionized various industries by offering capabilities that were once considered futuristic. With AI, businesses and organizations can achieve remarkable feats that were previously unimaginable. Give a prompt describing your thought and see what AI can do:
          <div className='flex justify-end'>-3By3</div>
          </div>
          
          <span className='flex'>
          
            <textarea placeholder={currentPlaceholder}
            rows='1' id='textarea' name='prompt' onChange={handlechange} onKeyDown={handleKeyPress} className='outline-none overflow-y-hidden resize-none  pl-4 pt-2 text-xl bg-grey  h-full ml-6 rounded-lg' ></textarea>
            <button onClick={addmessage}>
              <div className='ml-1 bg-white p-1.5 mb-1.5 rounded-lg'> 
                <img src={send} id='send'></img>
              </div>
            </button>
            </span>
            <div id='messages' className='pl-3 pt-1 text-xl bg-grey ml-6 rounded-lg' ></div>
           </div>
          
{/*           
           <span className='spreadbox'>
            <div className='box1'></div>
            <div className='box1'></div>
            <div className='box1'></div>
            <div className='box1'></div>
          
          </span>  */}
          
    </>)   
}
export default Home