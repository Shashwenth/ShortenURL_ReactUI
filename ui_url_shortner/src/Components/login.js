import React from "react";
import { useState } from "react";
import axios from "axios";
import landingPagePic from '../Static/LandingPage_background.png';
import TablePreview from "./TablePreview";
const backendURL="http://localhost:5000/";
//import { useNavigate } from "react-router-dom";
export default function Example() {

  const [userName, setUserName]= useState("");
  const [password, setPassword]=useState("");
  const [longURL,setlongURL]= useState("");
  const [shortURl, setShortURL]= useState("");
  const [response, setResponse]= useState(false);
  const [myresponse, setmyResponse]= useState(false);
  const [isMe, setisMe]=useState(false);
  const [prev, setprev] = useState(false);
  //sconst navigate=useNavigate();
  const [isLogin, setisLogin]=useState(true);
  const [isGuest, setGuest]=useState(false);


  const handleURLSubmit = async (event) => {
    event.preventDefault();
    if(isMe){
        console.log("Inside ISME")
        const resp= await axios.post(`${backendURL}`, {
            url: longURL
        });
        setShortURL(resp.data.url);
        setmyResponse(true);
        setisMe(false);
    }else if(isGuest){
        const resp= await axios.post(`${backendURL}guest`, {
            url: longURL
        });
        setShortURL(resp.data.url);
        setGuest(false);
        setResponse(true)
        
    }

  }

  const handleSubmit = async (event) =>{
    event.preventDefault();
    if(userName==="Shashwenth" &&  password==="Shashwenth"){
        setisLogin(false);
        setisMe(true);
    }
    console.log(userName,password)
  }

  const handleGuest= async (event) =>{
    event.preventDefault();
    setGuest(true);
    setisLogin(false);
  }

  const handleViewPrevEntries = () =>{
    setprev(true);
    setisMe(false);
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Half: Landing Page Image */}
      <div className="w-1/2 h-screen">
        <img
          src={landingPagePic}
          alt="Survey Illustration"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Half: Form Section */}
      {isLogin && (
      <div className="w-1/2 bg-white flex items-center justify-center p-8">
       
             <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
                <span>This App is not for Public use. Only Authorized users can get permanent links. If you would like permanent access contact me through <a href="https://www.linkedin.com/in/shashwenthm" className="text-sky-400/100">LinkedIn</a>.</span>
           
                {/* Your form content will go here */}
                <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={userName}
                    onChange={(e)=>setUserName(e.target.value)}
                    className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Enter your name"
                />
                </div>
                <div>
                <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    id="email"
                    name="email"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Enter your email"
                />
                </div>
                <button
                type="submit"
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
                >
                Submit
                </button>
            <br /><br /> 
            <span onClick={handleGuest} className="text-sky-500/100">Continue as guest.</span><span> Short URL valid until 28th of this month for Guests.</span> 
          </form>
  
        
        </div>
        )}

        { 
         isGuest && (
            <div className="w-1/2 bg-white flex items-center justify-center p-8">
                    <form className="w-full max-w-md space-y-4" onSubmit={handleURLSubmit}>
                        <span>This App is not for Public use. Only Authorized users can get permanent links. If you would like permanent access contact me through <a href="https://www.linkedin.com/in/shashwenthm" className="text-sky-400/100">LinkedIn</a>.</span>
                        <div>
                        <label htmlFor="Longurl" className="block text-lg font-medium text-gray-700">Enter the URL</label>
                        <input
                            type="text"
                            id="Longurl"
                            name="Longurl"
                            value={longURL}
                            onChange={(e)=>setlongURL(e.target.value)}
                            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                            placeholder="Long URL"
                        />
                        </div>
                        <button
                        type="submit"
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
                        >
                        Submit
                        </button>
                    <br />
                </form>
                
            </div>
        )}

            { 
            response && (
                <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 shadow-lg rounded-lg">
                <div className="space-y-6"> {/* Added more vertical space between elements */}
                    {/* Long URL Field */}
                    <div className="flex items-center space-x-6 border-b pb-4"> {/* Added border and padding-bottom for separation */}
                    <label className="text-lg font-medium text-gray-700 w-1/4">Long URL</label>
                    <input 
                        type="text" 
                        value={longURL} 
                        className="p-3 w-full sm:w-3/4 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly 
                    /> {/* Increased padding and width */}
                    </div>

                    {/* Short URL Field */}
                    <div className="flex items-center space-x-6 border-b pb-4">
                    <label className="text-lg font-medium text-gray-700 w-1/4">Short URL</label>
                    <input 
                        type="text" 
                        value={shortURl} 
                        className="p-3 w-full sm:w-3/4 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly 
                    /> {/* Increased padding and width */}
                    </div>

                    {/* Optional: Add a "Copy" button next to Short URL */}
                    <div className="flex justify-start space-x-4">
                    <button 
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                        onClick={() => navigator.clipboard.writeText(shortURl)}
                    >
                        Copy Short URL
                    </button>
                    </div>
                </div>
                </div>
            )
            }


            { 
            myresponse && (
                <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 shadow-lg rounded-lg">
                <div className="space-y-6"> {/* Added more vertical space between elements */}
                    {/* Long URL Field */}
                    <div className="flex items-center space-x-6 border-b pb-4"> {/* Added border and padding-bottom for separation */}
                    <label className="text-lg font-medium text-gray-700 w-1/4">Long URL</label>
                    <input 
                        type="text" 
                        value={longURL} 
                        className="p-3 w-full sm:w-3/4 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly 
                    /> {/* Increased padding and width */}
                    </div>

                    {/* Short URL Field */}
                    <div className="flex items-center space-x-6 border-b pb-4">
                    <label className="text-lg font-medium text-gray-700 w-1/4">Short URL</label>
                    <input 
                        type="text" 
                        value={shortURl} 
                        className="p-3 w-full sm:w-3/4 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly 
                    /> {/* Increased padding and width */}
                    </div>

                    {/* Optional: Add a "Copy" button next to Short URL */}
                    <div className="flex justify-start space-x-4">
                    <button 
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                        onClick={() => navigator.clipboard.writeText(shortURl)}
                    >
                        Copy Short URL
                    </button>
                    </div>
                    <br />
                    <br />
                    <span 
                        onClick={() => {setmyResponse(false); setisMe(true)}} 
                        className="text-sky-500/100 mt-4 cursor-pointer text-center"
                        >
                        Go Back
                        </span>
                </div>
                </div>
            )
            }



        { 
         isMe && (
            <div className="w-1/2 bg-white flex items-center justify-center p-8">
                    <form className="w-full max-w-md space-y-4" onSubmit={handleURLSubmit}>
                        <div>
                        <label htmlFor="Longurl" className="block text-lg font-medium text-gray-700">Long URL</label>
                        <input
                            type="text"
                            id="Longurl"
                            name="Longurl"
                            value={longURL}
                            onChange={(e)=>setlongURL(e.target.value)}
                            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                            placeholder="Enter the Long URL"
                        />
                        </div>
                        <button
                        type="submit"
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
                        >
                        Submit
                        </button>
                    <br />
                    <br />
                    <span onClick={handleViewPrevEntries} className="text-sky-500/100">View Previous Entries</span> 
                </form>
                
            </div>
        )}
        {prev && (
            <div className="w-1/2 bg-white flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-3xl">
                <div className="text-center text-xl text-gray-500">
                <h1>Previous Entries</h1>
                <br />
                </div>
                
                <TablePreview />
                </div>
                <span 
                onClick={() => {setprev(false); setisMe(true)}} 
                className="text-sky-500/100 mt-4 cursor-pointer text-center"
                >
                Create New Entry
                </span>
            </div>  
            )}

    </div>
  );
}
