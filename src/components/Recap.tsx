// import { useState } from "react";
import db from "../data/db.json";

export type Summary = {
    id: string,
    label: string,
    description: string,
    contextes: string [],
    localisations: string[],
    intensity: string[]
}
export function Recap(){

    return(
        <>
            <h2>Geste conseillé</h2>
            <div>
                {/* {db.solutions.map((item) => (

                )} */}
                {db.solutions.map((item) => (
                    <div key={item.id}>
                        <h3>{item.label}</h3>
                        <p>{item.contextes}</p>
                        <p>{item.description}</p>

                    </div>

                ))}
            </div>

        </>
    )


}