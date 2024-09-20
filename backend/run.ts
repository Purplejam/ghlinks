import { ConfigModule } from "@nestjs/config";
ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ".env"
})

import { NestApplication, NestFactory } from "@nestjs/core";
import { AppModule } from "./src/app.module";
import { ValidationPipe } from "@nestjs/common";

class Microservice {

    /**
     * Application instance
     */
    private app: NestApplication;

    /**
     * Application port
     */
    private port: number = Number.parseInt(process.env.PORT) || 3000;

    /**
     * Run application
     */
    public async run(): Promise<void> {
        this.app = await NestFactory.create<NestApplication>(AppModule);
        this.app.useGlobalPipes(new ValidationPipe({
            transform: true,
            whitelist: true
        }))

        await this.app.listen(this.port);
        this.printHTTPRoutes();
    }

    /**
     * Print all available HTTP routes to the console
     */
    private printHTTPRoutes(): void {
        if(process.env.NODE_ENV !== "development") {
            return;
        }

        console.log("=HTTP Routes=")
        // @ts-ignore
        const router = this.app.getHttpServer()._events.request._router;
        for(let i = 0; i < router.stack.length; i++) {
            if(!router.stack[i].route) {
                continue;
            }

            console.log(router.stack[i].route.methods, router.stack[i].route.path)
        }
        console.log("=============")
    }

}

new Microservice().run();