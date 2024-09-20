import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../../database/database.module";
import { ReposService } from "./repos.service";

@Module({
    imports: [
        DatabaseModule
    ],
    providers: [ ReposService ],
    exports: [ ReposService ]
})
export class ReposModule {}