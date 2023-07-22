import React, { useState ,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import './pages.css';
import Header from "./Header";
import ReactSlider from 'react-slider';
export default function SliderComponent(){
    const navigate=useNavigate()
    const params=useParams()
    const [id,setid]=useState("")
    const [url,seturl]=useState("")
    const [arr,setarr]=useState([])
    useEffect(()=>{
        const currentUser_ =JSON.parse(localStorage.getItem("currentuser"));
        const audioitem=JSON.parse(localStorage.getItem("audio"))
        if (currentUser_ == null) {
            navigate("/");
        }
        else if(currentUser_!=null){
            console.log(currentUser_,)
            setid(currentUser_['id'])
            seturl(params.filename)
        }
    },[]) 
    useEffect(()=>{
        console.log(id)
    },[id])
    useEffect(()=>{
        console.log(url)
    },[url])
    return(<div>
    <Header userid="abcd"/>
         <ReactSlider
    className="horizontal-slider"
    thumbClassName="example-thumb"
    trackClassName="example-track"
    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    defaultValue={[0,50]}
    min={0}
    max={50}
    onChange={(value,index)=>{setarr(value)}}
/>
</div>
    
    )
}