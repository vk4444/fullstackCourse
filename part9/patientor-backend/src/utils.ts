import { NewPatient, Gender } from './types';
import { z } from 'zod';

const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});

export default toNewPatient;