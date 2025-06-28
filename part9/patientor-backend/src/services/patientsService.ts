import patientsData from '../../data/patients.ts';
import { v4 as uuid } from 'uuid';
import { Patient, NewPatient } from '../types.ts';

const patients: Patient[] = patientsData as Patient[];

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): Omit<Patient, 'ssn'>[] => {
    const filteredPatients = patients.map((patient: Patient): Omit<Patient, 'ssn'> => ({id: patient.id, name: patient.name, dateOfBirth: patient.dateOfBirth, gender: patient.gender, occupation: patient.occupation}));
    return filteredPatients;
};

const addPatient = (patient: NewPatient): Patient => {
    const id: string = uuid();
    const newPatient: Patient = {
        id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        ssn: patient.ssn,
        gender: patient.gender,
        occupation: patient.occupation

  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};