import fs from "fs";
import { workTypes, types } from "./types"
import path from "path";

const dataPath: string = path.join(__dirname, '..', 'data', "/");

export async function readJsonFile(fileName: string): Promise<string> {
    let data: string = "";
    data = await fs.promises.readFile(dataPath + fileName, "utf-8");
    return JSON.parse(data);

}

export function calculateType(answers: number[]) : string {
    //Add +1 to every type for every matching answer
    for (let i = 0; i < workTypes.length; i++) {
        for (let j = 0; j < workTypes[i].questions.length; j++) {
            for (let k = 0; k < answers.length; k++) {
                if (answers[k] === workTypes[i].questions[j]){
                    workTypes[i].matchingAnswers += 1;
                }
            }
        }
    }
    
    //Get array of values
    const valArr : number[] = workTypes.map( x => x.matchingAnswers);


    //Find highest value
    const highestValue : number = Math.max(...valArr);

    //If there are multiple same answers it will get first one in array


    let typeCalculated : types = {} as types;

    
    for(let i = 0; i < workTypes.length; i++){
        if(highestValue === workTypes[i].matchingAnswers){
            typeCalculated = workTypes[i];
            break;
        }
    }

    return typeCalculated.jsonFileName;
}