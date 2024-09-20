import { SequelizeModule } from "@nestjs/sequelize";
import UsersModel from "./models/users.model";
import ReposModel from "./models/repos.model";

export const PsqlModule = SequelizeModule.forRoot({
    dialect: "postgres",
    dialectOptions: {
        ssl: true,
    },
    uri: process.env.PSQL_URI,
    port: 5432,
    logging: false,
    models: [ `${ __dirname }/models`  ],
    retryDelay: 5000,
    retryAttempts: 100
})

export const PsqlFeatureModule = SequelizeModule.forFeature([
    UsersModel,
    ReposModel
])

