import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ApiModule } from "./api/api.module";
import { RouterModule, Routes } from "@nestjs/core";
import { UsersApiModule } from "./api/users/users.module";
import { ReposApiModule } from "./api/repos/repos.module";
import { JwtModule } from "@nestjs/jwt";

const routes: Routes = [
    {
        path: '/api',
        module: ApiModule,
        children: [
            {
                path: '/users',
                module: UsersApiModule,
            },
            {
                path: '/repos',
                module: ReposApiModule,
            }
        ]
    }
]

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "1d" },
        }),
        RouterModule.register(routes),
        ApiModule,
        UsersApiModule,
        ReposApiModule
    ]
})
export class AppModule implements NestModule {

    public configure(consumer: MiddlewareConsumer): void {

    }

}

