import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import "../styles/navbar.scss";
import "../styles/analyse.scss";
import IntensityPain from "../components/IntensityPain";

export function Analyse(){
    return(
        <>
            <Navbar/>
            <Link to="/">
                <i className="fa-solid fa-chevron-left"></i>
            </Link>
           
             <IntensityPain/>
            
        </>
    )
}