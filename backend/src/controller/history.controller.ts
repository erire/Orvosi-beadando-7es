import { AppDataSource } from "../data-source";
import { History } from "../entity/History";
import { Controller } from "./base.controller";

export class HistoryController extends Controller {
    repository = AppDataSource.getRepository(History);
}