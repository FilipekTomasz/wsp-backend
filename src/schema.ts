
import { Schema, model } from "mongoose";

interface answers {
    results: number[];
    personalityType: string
}

interface age {
    age: number;
}

const answersSchema = new Schema<answers>({
    results: { type: [Number], required: true },
    personalityType: { type: String, required: true },

})

const ageSchema = new Schema<age>({
    age: {type: Number, required: true},
})



export const answersModel = model<answers>('answers', answersSchema);
export const ageModel = model<age>('age', ageSchema);