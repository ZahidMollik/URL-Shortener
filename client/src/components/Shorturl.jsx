import React, { useState } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {useForm} from 'react-hook-form'
import axios from 'axios'
function Shorturl() {
  const {register,handleSubmit} =useForm();
  const [url,setUrl] =useState('')
  const [copy,setCopy] =useState(false)
  const [inputData,setInputData] =useState('')
  const [totalVisitor,setTotalVisitor] =useState(0)
  const handleShorten=(data)=>{
    axios.post('http://localhost:8000/url/generate',{url:data.url})
    .then((res)=>{
      setUrl(res.data.url)
      setCopy(false)
      setTotalVisitor(0)
    }).catch((error)=>{
      console.log(error);
    })
  };

  const handleClear=()=>{
    setUrl('');
    setCopy(false);
  }
  const handleInput=(e)=>{
    setInputData(e.target.value);
  }
  const handleClick=()=>{
    let shortId=inputData.split('/').pop();
    axios.get(`http://localhost:8000/visitornumber/${shortId}`)
    .then((res)=>{
      setTotalVisitor(res.data);
    }).catch((error)=>{
      console.log(error);
    })
  }

  return (
  <div className=' w-3/4  min-w-[300px] md:w-[55%] md:h-[75%] lg:h-[65%] bg-blue-500  rounded-lg mx-auto'> 
    <h2 className='pt-12 text-center font-mono font-semibold text-xl text-white'>A Simple URL Shortener</h2>
    <form onSubmit={handleSubmit(handleShorten)} action=''>
    <input {...register('url')} className='mt-10 ml-10 py-3 w-[77%] md:w-[66%] rounded-md md:rounded-none  md:rounded-s-md' type="text" placeholder='Paste your link here...' />
    <input className='mx-10 md:mx-0 bg-teal-400 w-16 h-10 md:w-16 md:h-12 rounded-md md:rounded-none md:rounded-e-md' type="submit" value="Shorten" />
    </form>
    <div>
    <input className='ml-10 mt-3  py-3 w-[77%] md:w-[66%] rounded-md md:rounded-none  md:rounded-s-md ' type="text" value={url }  readOnly />
      <CopyToClipboard text={url} onCopy={()=>setCopy(true)}>
        <button className="w-16 h-10 ml-10 md:ml-0  md:w-16 md:h-12 rounded-md md:rounded-none   md:rounded-e-md bg-teal-400">{copy?'copied':'copyurl'}</button>
      </CopyToClipboard>
      <button onClick={handleClear} className='w-16 h-10  mx-1 md:ml-10 lg:ml-1  md:w-16 md:h-12  rounded-md bg-red-400'>clear</button>
    </div>
      <input onChange={handleInput} value={inputData}  className='mt-4 ml-10 py-3 w-[77%] md:w-[66%] rounded-md md:rounded-none  md:rounded-s-md' type="text" placeholder='Paste your link here...'  />
      <input onClick={handleClick} className='mx-10 md:mx-0 bg-teal-400 w-16 h-10 md:w-16 md:h-12 rounded-md md:rounded-none md:rounded-e-md' type="button" value="visitor" />
      <h3 className='font-mono font-semibold text-center text-white py-4'>Total Visitor:{totalVisitor}</h3>
      <h5 className='px-4'>
      🤍
        <span className='font-mono text-sm'> by Zahid Mollik</span>
      </h5>
  </div>
  )
}

export default Shorturl





