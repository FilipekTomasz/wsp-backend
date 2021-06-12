import { Schema, model } from "mongoose";

export interface Answers {
    results: number[];
    personalityType: string
}

export interface Age {
    age: number;
}

const AnswersSchema = new Schema<Answers>({
    results: { type: [Number], required: true },
    personalityType: { type: String, required: true },

})

const AgeSchema = new Schema<Age>({
    age: {type: Number, required: true},
})



export const answersModel = model<Answers>('Answers', AnswersSchema);
export const ageModel = model<Age>('Age', AgeSchema);