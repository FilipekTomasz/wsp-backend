import express, { NextFunction, Request, Response } from "express";
import { readJsonFile, calculateType, getTypeFromFile } from "./helperFunctions";
import { connectToDB } from "./dbFunctions";
import { Model } from "mongoose"
import path from "path";
import { ageModel, answersModel, Answers } from "./schema";
import { addData, readData } from "./dbFunctions"
import { workTypes } from "./types";

const app = express();

const viewPath: string = path.join(__dirname, '..', 'app', 'views');

connectToDB();

app.use(express.static(viewPath));

app.use(express.urlencoded({ extended: false, limit: '1kb' }));
app.use(express.json({ limit: '1kb' }));


app.get('/', (req: Request, res: Response) => {
    res.sendFile(viewPath + "/index.html");
})


// Reads questions.json file and returns questions to exam
app.get('/questions', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await readJsonFile("questions.json");
        res.json(data);
    } catch (e) {
        return next(e);
    }
})

//Gets age of user and saves it to db
app.post('/age', (req: Request, res: Response, next: NextFunction) => {
    //Sometimes empty object gets posted
    if (Object.entries(req.body).length === 0) {
        return next("Error, request body is empty");
    }

    const age = new ageModel({ age: req.body.age });

    addData(age);

    res.sendStatus(200);
})


//Returns how many people completed test, and which type they got
app.get('/typesData', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const modelData: Answers[] = await readData(answersModel) as Answers[];
        const typesInDB: string[] = modelData.map(model => model.personalityType);

        const sendData = {
            realistic: 0,
            experimental: 0,
            social: 0,
            artistic: 0,
            resourceful: 0,
            traditional: 0,
            completed: typesInDB.length,
        };

        for (let i = 0; i < typesInDB.length; i++) {
            sendData[typesInDB[i]] += 1;
        }

        res.json(sendData);
    } catch (e) {
        return next(e);
    }
})


//Gets array with Answers and returns json with schools
app.post('/answers', async (req: Request, res: Response, next: NextFunction) => {
    try {

        //Sometimes empty object gets posted
        if (Object.entries(req.body).length === 0) {
            return next("Error, request body is empty");
        }

        const yes = 'tak';

        // Array with number of questions where user answered "tak"
        const trueAnswers: number[] = req.body.map((answer: string, index) => answer === yes ? index + 1 : null).filter(one => one !== null); // +1 because array is 0-36 but questions are 1-37

        if (trueAnswers.length == 0) {
            return next("Incorrect data");
        }


        const fileNameAndAnswers = calculateType(trueAnswers);
        const data = await readJsonFile(fileNameAndAnswers[0]);
        const type = getTypeFromFile(fileNameAndAnswers[0])
        const dataToSend = {schools: data, answers: fileNameAndAnswers[1], type: type };
        
        res.json(dataToSend);

    } catch (e) {
        return next(e);
    }

})


app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});
 