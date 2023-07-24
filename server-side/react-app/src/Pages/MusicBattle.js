import React, { useState ,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import './pages.css'
import axios from 'axios'
import Header from "./Header";
export default function MusicBattle(){
    return (
        <div>
            <Header userid="abcd"/>
            Music Battle
        </div>
    )
}