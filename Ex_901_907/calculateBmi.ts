type Result = String;

export const calculateBmi = (a: number, b: number) : Result => {
    const Bmi = b / ((a/100) * (a/100));
    if(Bmi < 16) {
        return `Underweight (severe thinness)`;
    }else if (Bmi < 17) {
        return `Underweight (moderate thinness)`;
    }else if (Bmi < 18.5) {
        return `Underweight (mild thinness)`;
    }else if (Bmi < 25) {
        return `Normal weight`;
    }else if (Bmi < 30) {
        return `Overweight pre-obese`;
    }else if (Bmi < 35) {
        return `Obese (Class 1)`;
    }else if (Bmi < 40) {
        return `Obese (Class 2)`;
    }else{
        return `Obese (Class 3)`;
    }
}

/*try {
    if (process.argv.length < 4) throw new Error('Not enough arguments');
    if (process.argv.length > 4) throw new Error('Too many arguments');
    const requestArgs = process.argv;
    let strArr = [];
    for(let i = 2; i < requestArgs.length; i++) {
        const parsedFloat = Number(requestArgs[i]);
        if(isNaN(parsedFloat)) {
            throw new Error('array includes a non float value');
        }
        strArr = strArr.concat(parsedFloat);
    }
    const height = strArr[2];
    const weight = strArr[3];
    console.log(calculateBmi(height, weight));

} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
} */
