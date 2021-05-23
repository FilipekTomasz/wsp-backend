export interface Types {
    questions: number[], // questions user have to answer to get each personality type
    jsonFileName: string

}

const realistic: Types = {
    questions: [5, 26, 27, 31, 35, 36],
    jsonFileName: "realistic.json"

}

const experimental: Types = {
    questions: [3, 8, 17, 19, 25, 34, 37],
    jsonFileName: "experimental.json"

}

const social: Types = {
    questions: [6, 10, 12, 15, 22, 30],
    jsonFileName: "social.json"

}

const artistic: Types = {
    questions: [11, 16, 18, 28, 32, 33],
    jsonFileName: "artistic.json"

}

const resourceful: Types = {
    questions: [1, 2, 4, 14, 20, 23],
    jsonFileName: "resourceful.json"

}

const traditional: Types = {
    questions: [7, 9, 13, 21, 24, 29],
    jsonFileName: "traditional.json"

}

export const workTypes: Types[] = [
    realistic,
    experimental,
    social,
    artistic,
    resourceful,
    traditional
]