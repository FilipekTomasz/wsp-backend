import mongoose, { Model } from "mongoose";
import 'dotenv/config';

const uri: string = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.jmnmb.mongodb.net/wybor_szkoly?retryWrites=true&w=majority`;


export function connectToDB(): void {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection
        .once('open', () => console.log('Connected to db'))
        .on('error', (err) => {
            console.log(`Error connecting to db: ${err}`);
        });

}

export function addData(model): void { // model should be of type Model<any> but it doesnt work
    model.save((err) => {
        if (err) {
            console.log(`Error occured while saving data: ${err}`);
        }
    })
}