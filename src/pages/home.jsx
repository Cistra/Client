
import { Link } from 'react-router-dom'
import user from '../assets/user.png'
import send from '../assets/send-button.png'
import {Form }from 'react-bootstrap';
import './styles.css'
import { useState,useEffect} from 'react'
import axios from 'axios'
function Home(){
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




    return(
        <>
        <div className="m-2 rounded-b-3xl bg-white text-black w-{3/4} h-10 ">
        
          <div className="flex justify-end "> 
          { !isNaN(resl) ?(
    <button className="mr-10 bg-blue-300 pr-2 pl-2 rounded-full h-8 mt-1">
        <Link to="/signup">Sign in/Sign up</Link>
    </button>
) : (
    <span className='mt-1 text-2xl mr-3'>{resl.name}</span>
)}

          <img src={user} className=" mr-4 w-10 rounded-xl"></img>
          </div>
          </div>
          <div className='m-5 text-3xl'>
          Artificial intelligence (AI) has revolutionized various industries by offering capabilities that were once considered futuristic. With AI, businesses and organizations can achieve remarkable feats that were previously unimaginable. Here's a paragraph describing what AI can do:
          </div>
          <span className='flex'>
          
            <textarea placeholder='| your prompt goes here'
            rows='1' id='textarea' name='prompt' onChange={handlechange} onKeyDown={handleKeyPress} className='outline-none overflow-y-hidden resize-none  pl-4 pt-2 text-xl bg-grey  h-full ml-6 rounded-lg' ></textarea>
            <button onClick={addmessage}>
              <div className='ml-1 bg-white p-1.5 mb-1.5 rounded-lg'> 
                <img src={send} id='send'></img>
              </div>
            </button>
            </span>
            <div id='messages' className='pl-3 pt-1 text-xl bg-grey w-full ml-6 rounded-lg' ></div>
           
          
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