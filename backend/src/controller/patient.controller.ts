import { AppDataSource } from "../data-source";
import { Patient } from "../entity/Patient";
import { Controller } from "./base.controller";

export class PatientController extends Controller {
    repository = AppDataSource.getRepository(Patient);

    getAll = async (req, res) => {

        const search = req.query.search || '';

        try {
            const entities = await this.repository
            .createQueryBuilder('patient')
            .where("patient.socialsecuritynumber LIKE CONCAT('%', :search, '%')", {search: search})

            .leftJoinAndSelect('patient.histories', 'history')
            .leftJoinAndSelect('patient.diagnoses', 'diagnosis')
           
            .getMany();
            res.json(entities);
        } catch (err) {
            this.handleError(res, err);
        }
    };
}