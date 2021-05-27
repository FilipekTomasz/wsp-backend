import fs from "fs";
import { Types, workTypes } from "./types"
import path from "path";
import {answersModel} from "./schema";
import {addData} from "./dbFunctions"

const dataPath: string = path.join(__dirname, '..', 'data', "/");

//Reads json file
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
    //Creates array with types and holds how many answers match
    const types: {type: Types, matchingAnswers: number}[] = workTypes.map(type => ({type, matchingAnswers : 0}));

    //Counts answers matching workTypes.questions
    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < types[i].type.questions.length; j++) {
            for (let k = 0; k < answers.length; k++) {
                if (answers[k] === types[i].type.questions[j]){
                    types[i].matchingAnswers += 1;
                }
            }
        }
    }
    
    //Array of workTypes.matchingAnswers
    const valArr : number[] = types.map( x => x.matchingAnswers);

    //Finds the highest value
    const highestValue : number = Math.max(...valArr);

    let jsonFileName : string = "";

    //Gets jsonFileName of highestValue type
    for(let i = 0; i < types.length; i++){
        if(highestValue === types[i].matchingAnswers){
            jsonFileName = types[i].type.jsonFileName;
            prepareDataForDB(valArr, jsonFileName);
            break;
        }
    }
    return jsonFileName;
}

function prepareDataForDB(answers: number[], fileName: string) : void {
    const name : string = fileName.replace('.json', '');
    const data = new answersModel({
        results: answers,
        personalityType: name
    });
    addData(data);
}