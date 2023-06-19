import "reflect-metadata"
import { DataSource } from "typeorm"

import { Patient } from "./src/entity/Patient"
import { History } from "./src/entity/History"
import { Diagnosis } from "./src/entity/Diagnosis"

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
