import { isNumber } from "./utils";

interface Result { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface ParsedArguments {
    target: number,
    dailyHours: number[]
}

const parseArguments = (args: string[]): ParsedArguments => {
    const relevantArgs = args.slice(2);

  if (relevantArgs.length < 2) throw new Error('Not enough arguments');

  const argsAreNumbers = relevantArgs.every((arg: string): boolean => isNumber(arg));

  if(argsAreNumbers){
    const dailyHours = [];

    for (let i = 1; i < relevantArgs.length; i++) {
        dailyHours.push(Number(relevantArgs[i]));
    }

    return {
        target: Number(relevantArgs[0]),
        dailyHours
    }; 
  } else {
        throw new Error('Arguments are not numbers!');
    }
};

const calculateExercises = (dailyHours: number[], target: number): Result => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.reduce((sum: number, entry: number): number => entry > 0 ? sum + 1 : sum, 0 );
    const totalTime = dailyHours.reduce((sum: number, entry: number): number => sum + entry, 0);
    const average = totalTime/periodLength;
    const rating = (target - average) < (target / 2) ? 1
                    : (target - average) < (target) ? 2
                    : 3;

    const ratingDescription = rating === 1 ? 'you did not meet your goal'
                                : rating === 2 ? 'you almost met your goal'
                                : 'you met your goal!!!';

    const success =  rating === 3;

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

try {
    const { target, dailyHours } = parseArguments(process.argv);
    console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened ';
    if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message;
    }
    console.log(errorMessage);
}

export default calculateExercises;