"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const api_module_1 = require("./api/api.module");
const core_1 = require("@nestjs/core");
const users_module_1 = require("./api/users/users.module");
const repos_module_1 = require("./api/repos/repos.module");
const jwt_1 = require("@nestjs/jwt");
const routes = [
    {
        path: '/api',
        module: api_module_1.ApiModule,
        children: [
            {
                path: '/users',
                module: users_module_1.UsersApiModule,
            },
            {
                path: '/repos',
                module: repos_module_1.ReposApiModule,
            }
        ]
    }
];
let AppModule = class AppModule {
    configure(consumer) {
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: "1d" },
            }),
            core_1.RouterModule.register(routes),
            api_module_1.ApiModule,
            users_module_1.UsersApiModule,
            repos_module_1.ReposApiModule
        ]
    })
], AppModule);
exports.AppModule = AppModule;
