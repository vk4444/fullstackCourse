import diagnosesData from '../../data/diagnoses.ts';


import { Diagnosis } from '../types.ts';

const diagnoses: Diagnosis[] = diagnosesData;

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

const addDiary = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiary
};