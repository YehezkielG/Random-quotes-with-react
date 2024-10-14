import React, { useState, useEffect } from 'react';
import axios from 'axios';

let savedQuotes = [];
let prev = -1;

function App() {
  const [data, setData] = useState(0);

  const getQuotes = async (random) => {
    try {
      if(random){
        if(prev < savedQuotes.length-1){
        setData(await savedQuotes[prev+1]);  
        }
        else{
        const response = await axios.get('http://localhost:7070/quotes/random');  
        setData(await response.data);
        savedQuotes.push(await response.data);
        }
        if(savedQuotes.length > 5){
          savedQuotes.shift();
        }
        prev = savedQuotes.length-1;
        console.log(prev);
      }
      else{
        if(prev > 0){
          prev--;
          console.log(prev);
          setData(await savedQuotes[prev]);
        }
      }      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  useEffect(() => {
    getQuotes(true);
  }, [])

  return (
    <>
    <div className="bg-white bg-opacity-20 p-16 my-5 relative border-2 border-white rounded-lg">
          <div className="bg-black absolute m-auto h-full w-full -z-10  rounded-lg left-3 top-3"></div>
      <div id="root" className="text-white">
        <div>
          {data ? (
            <div>
              <span>"</span>{data.Quote}<span>"</span>
              <p className='font-bold'>- {data.Author}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
      <div className="w-full flex justify-between">
        <button id="prev" className="-scale-x-100"  onClick={()=>getQuotes(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 512 512"><path fill="#49A0AE" d="M7.9,256C7.9,119,119,7.9,256,7.9C393,7.9,504.1,119,504.1,256c0,137-111.1,248.1-248.1,248.1C119,504.1,7.9,393,7.9,256z"></path><path fill="#FFF" d="M357.4,237.8c-37.6-37.6-75.2-75.2-112.8-112.8c-26.8-26.8-68.2,14.9-41.3,41.8c30.6,30.6,61.3,61.2,91.9,91.9c-30.7,30.7-61.4,61.4-92.1,92.1c-26.8,26.8,14.9,68.2,41.8,41.3c37.6-37.6,75.2-75.2,112.8-112.8C368.9,268,368.6,249,357.4,237.8z"></path></svg>
        </button>
        <button id="next" onClick={()=>getQuotes(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 512 512"><path fill="#49A0AE" d="M7.9,256C7.9,119,119,7.9,256,7.9C393,7.9,504.1,119,504.1,256c0,137-111.1,248.1-248.1,248.1C119,504.1,7.9,393,7.9,256z"></path><path fill="#FFF" d="M357.4,237.8c-37.6-37.6-75.2-75.2-112.8-112.8c-26.8-26.8-68.2,14.9-41.3,41.8c30.6,30.6,61.3,61.2,91.9,91.9c-30.7,30.7-61.4,61.4-92.1,92.1c-26.8,26.8,14.9,68.2,41.8,41.3c37.6-37.6,75.2-75.2,112.8-112.8C368.9,268,368.6,249,357.4,237.8z"></path></svg>
        </button>
      </div>
    </>

  );
}

export default App;