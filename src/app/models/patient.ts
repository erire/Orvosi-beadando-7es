import { History } from "./history";
import { Diagnosis } from "./diagnosis";

export interface Patient{
    id: string;
    name: string;
    dateofbirth: string;
    socialsecuritynumber: number;
    gender: string;

    histories: History[];
    diagnoses: Diagnosis[];
}