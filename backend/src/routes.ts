import express from 'express';

import { PatientController } from './controller/patient.controller';
import { HistoryController } from './controller/history.controller';
import { DiagnosisController } from './controller/diagnosis.controller';

export function getRoutes() {
    const router = express.Router();

    const patientController = new PatientController();
    const historyController = new HistoryController();
    const diagnosisController = new DiagnosisController()


    router.get('/histories', historyController.getAll);
    router.get('/histories/:id', historyController.getOne);
    router.post('/histories', historyController.create);
    router.put('/histories', historyController.update);
    router.delete('/histories/:id', historyController.delete);

    router.get('/patients', patientController.getAll);
    router.get('/patients/:id', patientController.getOne);
    router.post('/patients', patientController.create);
    router.put('/patients', patientController.update);
    router.delete('/patients/:id', patientController.delete);

    router.get('/diagnoses', diagnosisController.getAll);
    router.get('/diagnoses/:id', diagnosisController.getOne);
    router.post('/diagnoses', diagnosisController.create);
    router.put('/diagnoses', diagnosisController.update);
    router.delete('/diagnoses/:id', diagnosisController.delete);

    return router;
}
