import express from 'express';
import { Patient, NewPatient } from '../types';
import toNewPatient from '../utils';
import { z } from 'zod';

import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientsService.getNonSensitivePatients();
  res.send(patients);
});

router.post('/', (req, res) => {

    try {
        const newPatient: NewPatient = toNewPatient(req.body);
        const patient: Patient = patientsService.addPatient(newPatient);
        res.json(patient);
    } catch (error: unknown) {
         if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
    }
    


});

export default router;