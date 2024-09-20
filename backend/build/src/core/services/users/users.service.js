"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_model_1 = require("../../../database/psql/models/users.model");
const sequelize_1 = require("@nestjs/sequelize");
const bcryptjs_1 = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(usersModel, jwtService) {
        this.usersModel = usersModel;
        this.jwtService = jwtService;
    }
    async find(params) {
        const { email } = params;
        return this.usersModel.findOne({
            where: {
                email: email
            }
        });
    }
    async login(params) {
        const { email, password } = params;
        const user = await this.usersModel.findOne({
            where: {
                email: email
            },
            raw: true
        });
        if (!user) {
            return null;
        }
        const isEquals = await this.comparePasswords(password, user.password);
        if (!isEquals) {
            return null;
        }
        const payload = {
            id: user.id, email: user.email
        };
        const userToken = await this.jwtService.signAsync(payload);
        return {
            user: this.excludePassword(user),
            userToken: userToken
        };
    }
    async create(params) {
        const { email } = params;
        const password = await this.encryptPassword(params.password);
        const user = await this.usersModel.create({
            email: email,
            password: password
        });
        if (!user) {
            return;
        }
        const payload = {
            id: user.id, email: user.email
        };
        const userToken = await this.jwtService.signAsync(payload);
        return {
            user: this.excludePassword(user),
            userToken: userToken
        };
    }
    async comparePasswords(password, passwordHash) {
        return (0, bcryptjs_1.compare)(password, passwordHash);
    }
    async encryptPassword(password) {
        return (0, bcryptjs_1.hash)(password, process.env.BCRYPT_PASSWORD_SALT);
    }
    excludePassword(user) {
        if (user) {
            delete user.password;
        }
        return user;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.default)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
