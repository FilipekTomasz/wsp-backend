export interface types {
    questions: number[], // pytania na ktore trzeba odpowiedziec zeby ten tyb wybralo
    jsonFileName: string

}

const realistyczny: types = {
    questions: [9, 11, 26, 30, 50, 51, 57, 6, 12, 37],
    jsonFileName: "realistyczny.json"

}

const badawczy: types = {
    questions: [31, 35, 40, 42, 60, 43, 47, 7, 20, 4],
    jsonFileName: "badawczy.json"

}

const spoleczny: types = {
    questions: [15, 1, 10, 46, 59, 49, 23, 32, 34, 52],
    jsonFileName: "spoleczny.json"

}

const artystyczny: types = {
    questions: [36, 22, 25, 41, 44, 3, 5, 14, 16, 19],
    jsonFileName: "artystyczny.json"

}

const przedsiebiorczy: types = {
    questions: [38, 21, 29, 53, 56, 45, 2, 13, 17, 28],
    jsonFileName: "przedsiebiorczy.json"

}

const konwencjonalny: types = {
    questions: [39, 33, 24, 21, 54, 55, 58, 8, 18, 27],
    jsonFileName: "konwencjonalny.json"

}

export const workTypes : types[] = [
    realistyczny, 
    badawczy, 
    spoleczny, 
    artystyczny, 
    przedsiebiorczy, 
    konwencjonalny
]