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


//Czyta plik questions.json i zwraca pytania do tego testu
app.get('/questions', async (req: Request, res: Response) => {
    const data: string = await readJsonFile("questions.json");
    res.json(data);
})


//Dostaje arraya z fronta z odpowiedziami i zwraca plik json z szkołami
app.post('/answers', async (req: Request, res: Response) => {
        let trueAnswers: number[] = [];
        console.log(req.body);
        Array.from(req.body).forEach((item: unknown, index: number) => {
            if (item === "tak") {
                trueAnswers.push(index);
            }
        });
        console.log(trueAnswers);
        if (trueAnswers.length != 0) {
            const fileName: string = calculateType(trueAnswers);
            const data: string = await readJsonFile(fileName);


            res.json(data);
        } else {
            res.json();
        }
    
})


app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
