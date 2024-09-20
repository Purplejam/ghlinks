"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
config_1.ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ".env"
});
const core_1 = require("@nestjs/core");
const app_module_1 = require("./src/app.module");
const common_1 = require("@nestjs/common");
class Microservice {
    constructor() {
        this.port = Number.parseInt(process.env.PORT) || 3000;
    }
    async run() {
        this.app = await core_1.NestFactory.create(app_module_1.AppModule);
        this.app.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
            whitelist: true
        }));
        await this.app.listen(this.port);
        this.printHTTPRoutes();
    }
    printHTTPRoutes() {
        if (process.env.NODE_ENV !== "development") {
            return;
        }
        console.log("=HTTP Routes=");
        const router = this.app.getHttpServer()._events.request._router;
        for (let i = 0; i < router.stack.length; i++) {
            if (!router.stack[i].route) {
                continue;
            }
            console.log(router.stack[i].route.methods, router.stack[i].route.path);
        }
        console.log("=============");
    }
}
new Microservice().run();
