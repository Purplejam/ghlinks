import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PsqlModule, PsqlFeatureModule } from "./psql/psql.module";

@Module({
    imports: [
        PsqlModule,
        PsqlFeatureModule
    ],
    exports: [ SequelizeModule ]
})
export class DatabaseModule {}

