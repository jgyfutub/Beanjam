import React, { useState ,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import './pages.css';
import Header from "./Header";
import axios from "axios";
import ReactSlider from 'react-slider';
export default function SliderComponent(){
    const navigate=useNavigate()
    const params=useParams()
    const [id,setid]=useState("")
    const [url,seturl]=useState("")
    const [arr,setarr]=useState([])
    const [num,setnum]=useState(0)
    const handleView=async(e)=>{
        e.preventDefault()
        const formdata=new FormData()
        formdata.append("url","C://Users/Acer/OneDrive/Desktop/Avishkar2023/server-side/react-app/public/audios/"+url)
        formdata.append("filename",url)
        const response=await axios.post('http://127.0.0.1:8000/cropaudioimage/',formdata)
        localStorage.setItem('time',JSON.stringify({audio:response.data.time}))
    }
    const handleCrop=async(e)=>{
        e.preventDefault()
        const formdata=new FormData()
        formdata.append("array",arr)
        formdata.append("file",url)
        const response=await axios.post("http://127.0.0.1:8000/cropaudio/",formdata)

    }
    useEffect(()=>{
        const currentUser_ =JSON.parse(localStorage.getItem("currentuser"));
        const audioitem=JSON.parse(localStorage.getItem("time"))
        if (currentUser_ == null) {
            navigate("/");
        }
        else if(currentUser_!=null){
            console.log(currentUser_,)
            setid(currentUser_['id'])
            seturl(params.filename)
            if(audioitem!=null){
                setnum(audioitem.audio)
            }
        }
    },[])
    useEffect(()=>{
        console.log(id)
    },[id])
    useEffect(()=>{
        console.log(url)
    },[url])
    useEffect(()=>{
        console.log(arr)
    },[arr])
    return(
    <div>
    <Header userid="abcd"/>
    <button onClick={handleView} style={{marginTop:'80px'}}>Show sound Graph</button>
    <div style={{display:'grid',justifyContent:'center'}}>
         <ReactSlider
    className="horizontal-slider"
    thumbClassName="example-thumb"
    trackClassName="example-track"
    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    defaultValue={[0,num]}
    min={0}
    max={num}
    onChange={(value,index)=>{setarr(value)}}
/>
{url &&(
<img src={`/cropplots/${url.split(".")[0]}.png`} height={100} width={400}/>)}
<p>Start : {arr[0]}</p>
<p>End : {arr[1]}</p>
</div>
<div style={{display:'grid',justifyContent:'center',rowGap:'30px'}}>
{url && (
<audio controls style={{marginTop:'60px'}}>
<source src={`/cropaudios/${url}`} type="audio/wav"/>
Your browser does not support the audio element.
</audio>)}
<button onClick={handleCrop}>Crop and Check</button>
<button>Confirm Crop</button>
</div>
</div>
    
    )
}