import "reflect-metadata"
import { DataSource } from "typeorm"

import { Patient } from "./entity/Patient"
import { History } from "./entity/History"
import { Diagnosis } from "./entity/Diagnosis"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "medical",
    synchronize: true,
    logging: true,
    entities: [Patient, History, Diagnosis],
    migrations: [],
    subscribers: [],
})
