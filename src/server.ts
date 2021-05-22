import express, { NextFunction, Request, Response } from "express";
import { readJsonFile, calculateType } from "./helperFunctions";
import path from "path";
import { nextTick } from "process";

const app = express()

const port: string | number = process.env.PORT || 80;

const viewPath: string = path.join(__dirname, '..', 'app', 'views');


app.use(express.static(viewPath));

app.use(express.urlencoded({ extended: false, limit: '1kb' }));
app.use(express.json({ limit: '1kb' }));


app.get('/', (req: Request, res: Response) => {
    res.sendFile(viewPath + "/index.html");
})


//Czyta plik questions.json i zwraca pytania do testu
app.get('/questions', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: string = await readJsonFile("questions.json");
        res.json(data);
    } catch (e) {
        return next(e)
    }
})


//Dostaje arraya z fronta z odpowiedziami i zwraca plik json z szkołami
app.post('/answers', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let trueAnswers: number[] = []; // Array do ktorego sa dodawane numery pytan na ktore sie odpowiedzialo "tak"
        Array.from(req.body).forEach((answer: unknown, index: number) => {
            if (answer === "tak") {
                trueAnswers.push(index);
            }
        });
        if (trueAnswers.length != 0) {
            const fileName: string = calculateType(trueAnswers);
            const data: string = await readJsonFile(fileName);

            res.json(data);
        }
    } catch (e) {
        return next(e)
    }

})


app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
