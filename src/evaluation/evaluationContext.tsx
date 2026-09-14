import db from "../data/db.json";
type Evaluation = {
    intensites: string[],
    localisations: string[],
    contextes: string[] | null,
}

export function Evaluation()
