import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ApiModule } from "./api/api.module";

@Module({
    imports: [
        ApiModule
    ]
})
export class AppModule implements NestModule {

    public configure(consumer: MiddlewareConsumer): void {

    }

}

