export interface Types {
    questions: number[], // questions user have to answer to get each personality type
    jsonFileName: string

}

const realistic: Types = {
    questions: [9, 11, 26, 30, 50, 51, 57, 6, 12, 37],
    jsonFileName: "realistic.json"

}

const experimental: Types = {
    questions: [31, 35, 40, 42, 60, 43, 47, 7, 20, 4],
    jsonFileName: "experimental.json"

}

const social: Types = {
    questions: [15, 1, 10, 46, 59, 49, 23, 32, 34, 52],
    jsonFileName: "social.json"

}

const artistic: Types = {
    questions: [36, 22, 25, 41, 44, 3, 5, 14, 16, 19],
    jsonFileName: "artistic.json"

}

const resourceful: Types = {
    questions: [38, 21, 29, 53, 56, 45, 2, 13, 17, 28],
    jsonFileName: "resourceful.json"

}

const traditional: Types = {
    questions: [39, 33, 24, 21, 54, 55, 58, 8, 18, 27],
    jsonFileName: "traditional.json"

}

export const workTypes : Types[] = [
    realistic, 
    experimental, 
    social, 
    artistic, 
    resourceful, 
    traditional
]