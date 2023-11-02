interface ExResult {
    periodLength: Number,
    trainingDays: Number,
    success: Boolean,
    rating: Number,
    ratingDescription: String,
    target: Number,
    average: Number
};

const ratingFunction = (a: number, b: number) : number => {
    if ((a / b) > 2) {
        return 3
    }else if((a / b) > 1) {
        return 2
    }else{
        return 1
    }
}

const getRatingDescription = (a: number) : string => {
    if (a <= 1) {
        return 'More effort requried'
    }else if(a >= 3) {
        return 'Extremely good effort!'
    }else{
        return 'Nice job, but you could do better'
    }
}

const fitnessDetails = (a: Array<number>, target: number): ExResult => {
    const trainingDays = a.filter(x => x !== 0).length;
    const totalTrainingHours = (a.reduce((acc, value) => (acc + value), 0))
    const average = totalTrainingHours/trainingDays;
    const rating = ratingFunction(totalTrainingHours,a.length)
    const success = rating > target ? true : false

    return {
        periodLength: a.length,
        trainingDays: trainingDays,
        average: average,
        rating: rating,
        success: success,
        ratingDescription: getRatingDescription(rating),
        target: target
    }
}

try {
    if (process.argv.length < 4) throw new Error('Not enough arguments');
    const requestArgs = process.argv;
    let strArr: any[] = [];
    for(let i = 2; i < requestArgs.length; i++) {
        const parsedFloat = Number(requestArgs[i]);
        if(isNaN(parsedFloat)) {
            throw new Error('array includes a non float value');
        }
        strArr = strArr.concat(parsedFloat);
    }
    const data = strArr.slice(3);
    const target = strArr[2];

    console.log(fitnessDetails(data, target));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
