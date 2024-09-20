"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PsqlFeatureModule = exports.PsqlModule = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("./models/users.model");
const repos_model_1 = require("./models/repos.model");
exports.PsqlModule = sequelize_1.SequelizeModule.forRoot({
    dialect: "postgres",
    dialectOptions: {
        ssl: true,
    },
    uri: process.env.PSQL_URI,
    port: 5432,
    logging: false,
    models: [`${__dirname}/models`],
    retryDelay: 5000,
    retryAttempts: 100
});
exports.PsqlFeatureModule = sequelize_1.SequelizeModule.forFeature([
    users_model_1.default,
    repos_model_1.default
]);
