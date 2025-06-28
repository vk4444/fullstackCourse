import { isNumber } from "./utils";

const parseArguments = (args: string[]): ParsedArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (isNumber(args[2]) && isNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

interface ParsedArguments {
    height: number,
    weight: number
}

const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight/((height/100)*(height/100));

    
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 25) {
        return "Normal Range";
    } else if (bmi < 30) {
        return "Overweight";
    } else if (bmi < 35) {
        return "Obese";
    } else {
        return "Extremely Obese";
    }
};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened ';
    if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message;
    }
    console.log(errorMessage);
}

export default calculateBmi;