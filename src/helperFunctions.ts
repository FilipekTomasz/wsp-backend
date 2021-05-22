import fs from "fs";
import { types, workTypes } from "./types"
import path from "path";

const dataPath: string = path.join(__dirname, '..', 'data', "/");

//Czyta plik json
export async function readJsonFile(fileName: string): Promise<string> {
    try{
        let data: string = "";
        data = await fs.promises.readFile(dataPath + fileName, "utf-8");
        return JSON.parse(data);
    } catch(e){
        console.log(e);
        return "";
    }


}

export function calculateType(answers: number[]) : string {
    // to jest troche dziwnie napisane ale nie mialem lepszego pomyslu na przechowywanie ile odpowiedzi sie zgadza do kazdego typu osobowości 
    let types: {type: types, matchingAnswers: number}[] = [
        {type: workTypes[0], matchingAnswers : 0 },
        {type: workTypes[1], matchingAnswers: 0 },
        {type: workTypes[2], matchingAnswers: 0 },
        {type: workTypes[3], matchingAnswers: 0 },
        {type: workTypes[4], matchingAnswers: 0 },
        {type: workTypes[5], matchingAnswers: 0 },

    ]

    //Zlicza odpowiedzi pasujące do workTypes.questions
    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < types[i].type.questions.length; j++) {
            for (let k = 0; k < answers.length; k++) {
                if (answers[k] === types[i].type.questions[j]){
                    types[i].matchingAnswers += 1;
                }
            }
        }
    }
    
    //array workTypes.matchingAnswers
    const valArr : number[] = types.map( x => x.matchingAnswers);

    //znajduje najwyzsza wartosc
    const highestValue : number = Math.max(...valArr);

    //Jak jest kilka takich samych to wybrany jest 1 typ w arrayu workTypes
    let jsonFileName : string = "";

    
    for(let i = 0; i < types.length; i++){
        if(highestValue === types[i].matchingAnswers){
            jsonFileName = types[i].type.jsonFileName;
            break;
        }
    }
    return jsonFileName;
}