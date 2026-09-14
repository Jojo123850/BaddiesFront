import { createContext, useContext, useState } from "react";


type Evaluation = {
    intensites:string[] | null ,
    localisations: string[],
    contextes: string[] | null,
}

type EvaluationContextType = {
    evaluation: Evaluation
    setEvaluation: React.Dispatch<React.SetStateAction<Evaluation>>;
}
// createContext c'est une mémoire partagé pour les composants 
const EvalContext = createContext<EvaluationContextType | null> (null);

export function EvaluationProvider({children}: {children: React.ReactNode}){
    const [evaluation, setEvaluation] = useState<Evaluation>({
         intensites: null,
        localisations: [],
        contextes: null ,
    })

    return( 
       <EvalContext.Provider value ={{evaluation, setEvaluation}}>
            {children}
       </EvalContext.Provider>
        
    )

}

export function useEvaluation(){
    const Context = useContext(EvalContext);
    if(!Context){
        throw new Error( "useEvaluation doit etre afficher dans EvalContext") 
    }
    
    return Context
}

