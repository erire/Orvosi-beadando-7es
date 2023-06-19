import { AppDataSource } from "../data-source";
import { Diagnosis } from "../entity/Diagnosis";
import { Controller } from "./base.controller";

export class DiagnosisController extends Controller {
    repository = AppDataSource.getRepository(Diagnosis);
}