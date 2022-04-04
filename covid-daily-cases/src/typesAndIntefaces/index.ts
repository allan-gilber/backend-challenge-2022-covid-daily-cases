export type covidDataStructure = {
    location: string, 
    variant:string,
    numberOfSequences: number,
    percentageOfSequences:number,
    totalOfSequencesNumbers:number
}

export type dateObject = {
    date: string
}

export type dataBaseDateList ={
    [key: string] : dateObject
}