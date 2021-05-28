import express, { NextFunction, Request, Response } from "express";
import { readJsonFile, calculateType } from "./helperFunctions";
import { connectToDB } from "./dbFunctions";
import { Model } from "mongoose"
import path from "path";
import { ageModel, answersModel, answers } from "./schema";
import { addData, readData } from "./dbFunctions"
import { workTypes } from "./types";

const app = express();

const port: string | number = process.env.PORT || 80;

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

app.get('/typesData', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const modelData: answers[] = await readData(answersModel) as answers[];
        const data = modelData.map(model => model.personalityType);

        const types = {
            realistic: 0,
            experimental: 0,
            social: 0,
            artistic: 0,
            resourceful: 0,
            traditional: 0
        };

        for(let i = 0; i < data.length; i++){
            types[data[i]] += 1;
        }
        res.json(JSON.parse(JSON.stringify(types)));
    } catch (e) {
        return next(e)
    }
})



//Gets array with answers and returns json with schools
app.post('/answers', async (req: Request, res: Response, next: NextFunction) => {
    try {

        //Sometimes empty object gets posted
        if (Object.entries(req.body).length === 0) {
            return next("Error, request body is empty");
        }

        // Array with number of questions where user answered "tak"
        const trueAnswers: number[] = req.body.map((answer: string, index) => answer === 'tak' ? index : null).filter(one => one !== null);

        if (trueAnswers.length == 0) {
            return next("Incorrect data");
        }

        const fileName = calculateType(trueAnswers);
        const data = await readJsonFile(fileName);

        res.json(data);

    } catch (e) {
        return next(e);
    }

})


app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
