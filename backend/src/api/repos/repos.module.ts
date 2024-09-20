import { Module } from "@nestjs/common";
import { ReposController } from "./repos.controller";
import { ReposModule } from "../../core/services/repos/repos.module";

@Module({
    imports: [ ReposModule ],
    controllers: [ ReposController ]
})
export class ReposApiModule {}