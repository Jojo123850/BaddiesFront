import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import "../styles/navbar.scss";
import "../styles/analyse.scss";
import IntensityPain from "../components/IntensityPain";
import { useState } from "react";
import IntensityPainB from "../components/IntesityPainB";


export function Analyse(){
    const [isAsking, setIsAsking] = useState(false)
    return(
        <>
            <Navbar/>
            {!isAsking ?(
                <>
                <div className="switch">
                    <Link to="/Zone" className="retour">
                        <i className="fa-solid fa-chevron-left"></i>
                    </Link>
                    <button onClick={() => setIsAsking(true)} className="btn">Mode questionnaire</button>
                </div>
                <IntensityPain/>
                </>
        ):(

                <>
                <div className="switchIntensity">
                    <Link to="/Home" className="retour">
                        <i className="fa-solid fa-chevron-left"></i>
                    </Link>
                    <button onClick={() => setIsAsking(false)} className="btn">Mode anneau</button>
                </div>
                    <IntensityPainB/>
                </>
            )}
           
      
            
        </>
    )
}