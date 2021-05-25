import express, { NextFunction, Request, Response } from "express";
import { readJsonFile, calculateType } from "./helperFunctions";
import path from "path";

const app = express();

const port: string | number = process.env.PORT || 80;

const viewPath: string = path.join(__dirname, '..', 'app', 'views');


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
