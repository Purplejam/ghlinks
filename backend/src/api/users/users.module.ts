import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersModule } from "../../core/services/users/users.module";

@Module({
    imports: [ UsersModule ],
    controllers: [ UsersController ]
})
export class UsersApiModule {}