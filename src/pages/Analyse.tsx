import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/navbar.scss";
import "../styles/analyse.scss";
import { ChevronLeft } from "lucide-react";

import IntensityPain from "../components/IntensityPain";
import { useState } from "react";
import IntensityPainB from "../components/IntesityPainB";


export default function Analyse(){
    const [isAsking, setIsAsking] = useState(false)
    return(
        <>
            <Navbar/>
            {!isAsking ?(
                <>
                <div className="switch">
                    <Link to="/Zone" className="retour">
                          <ChevronLeft
                                size={22}
                                strokeWidth={1.8}
                                aria-hidden="true"
                            />
                    </Link>
                    <button onClick={() => setIsAsking(true)} className="btn-switch">Mode questionnaire</button>
                </div>
                <IntensityPain/>
        </>
        ):(
                <>
                <div className="switchIntensity">
                    <Link to="/Home" className="retour">
                          <ChevronLeft
                                size={22}
                                strokeWidth={1.8}
                                aria-hidden="true"
                        />
                    </Link>
                    <button onClick={() => setIsAsking(false)} className="btn-switch">Mode anneau</button>
                </div>
                    <IntensityPainB/>
                </>
            )}
           
      
            
        </>
    )
}