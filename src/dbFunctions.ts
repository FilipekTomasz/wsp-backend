import mongoose from "mongoose";
import 'dotenv/config';

const uri: string = `mongodb+srv://${process.env.DBUSER}:${process.env.PASSWORD}@cluster0.jmnmb.mongodb.net/wybor_szkoly?retryWrites=true&w=majority`;


//Connects to db
export function connectToDB(): void {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection
        .once('open', () => console.log('Connected to db'))
        .on('error', (err) => {
            console.log(`Error connecting to db: ${err}`);
        });

}

//Saves passed model to db
export function addData(model): void { // model should be of type Model<any> but it doesnt work
    model.save((err) => {
        if (err) {
            console.log(`Error occured while saving data: ${err}`);
        }
    })
}
//Reads data of model provided
export async function readData(model) : Promise<object[]> { // model should be of type Model<any> but it doesnt work
    let returnData : object[] = [];
    return await model.find({}, (err,data) =>{
        if(err){
            console.log(`Error occured while reading data: ${err}`)
        } 
        return returnData = data;
    })
}