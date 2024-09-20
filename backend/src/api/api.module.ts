import { Module } from "@nestjs/common";
import { UsersApiModule } from "./users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ReposApiModule } from "./repos/repos.module";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "1d" },
        }),
        UsersApiModule,
        ReposApiModule
    ]
})
export class ApiModule {}