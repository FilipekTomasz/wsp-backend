import express, { Request, Response } from "express";
import { readJsonFile, calculateType } from "./helperFunctions";
import path from "path";

const app = express()

const port: string | number = process.env.PORT || 80;

const viewPath: string = path.join(__dirname, '..', 'app', 'views');


app.use(express.static(viewPath));

app.use(express.urlencoded({ extended: false, limit: '1kb' }));
app.use(express.json({ limit: '1kb' }));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(viewPath + "/index.html");
})

app.get('/questions', async (req: Request, res: Response) => {
    const data: string = await readJsonFile("questions.json");
    res.json(data);
})

app.post('/answers', async (req: Request, res: Response) => {
    let trueAnswers: number[] = [];

    req.body.forEach((item: string, index: number) => {
        if (item === "tak") {
            trueAnswers.push(index+1); // + 1 because answers are from 1-60 but array is 0-59
        }
    });
    const fileName : string = calculateType(trueAnswers);
    const data : string = await readJsonFile(fileName);


    res.json(data);
})


app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
