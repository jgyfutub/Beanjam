import React ,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './pages.css'
export default function Header(props){
    const [bool,funcbool]=useState(false)
    const navigate = useNavigate()
    const handleClick=()=>{
        funcbool(prevBool => !prevBool)
    }
    const handlelogout=async(e)=>{
        // console.log(localStorage.getItem('Currentuser'))
        await localStorage.removeItem('currentuser')
        await localStorage.removeItem('time')
        await localStorage.removeItem('newurl')
        await localStorage.removeItem('audio')
        navigate('/')
    }
    useEffect(() => {
        console.log(bool); 
      }, [bool]);
    return <div>
    <div className="Header">
            <button onClick={handleClick}>≡</button>
            <p>Beanjam</p>
        </div>
        {bool ? (
        <div className="PopUp">
            <p style={{color:'white'}}>Welcome, {props.userid}</p>
            <hr/>
            <button onClick={()=>{navigate('/dashboard')}}>Home Page</button>
            <hr/>
            <button onClick={()=>{navigate('/Aigenerator')}}>Friends Uploads</button>
            <hr/>
            <button onClick={()=>{navigate('/SuperResolution')}}>Start Rap Battle</button>
            <hr/>
            <button onClick={()=>{navigate('/list')}}>Followers and Following</button>
            <hr/>
            <button onClick={()=>{navigate('/savedenhancedimages')}}>Saved Image enhancer Images</button>
            <hr/>
            <button onClick={handlelogout}>Log Out</button>
            <hr/>
            </div>)
            :
            (<div></div>)
            }
    </div>
}