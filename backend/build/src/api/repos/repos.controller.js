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
exports.ReposController = void 0;
const common_1 = require("@nestjs/common");
const repos_service_1 = require("../../core/services/repos/repos.service");
const auth_guard_1 = require("../../core/guards/auth.guard");
const repos_dto_1 = require("./repos.dto");
let ReposController = class ReposController {
    constructor(reposService) {
        this.reposService = reposService;
        this.baseUrl = "https://api.github.com/search/repositories";
    }
    async get(request, params) {
        const { user } = request;
        return this.reposService.all({
            user_id: user.id
        });
    }
    async create(request, params) {
        const { name } = params;
        const { user } = request;
        const query = `${encodeURIComponent(name)}+in:name&per_page=1&page=1`;
        const url = `${this.baseUrl}?q=${query}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new common_1.HttpException(`Error: ${response.status}`, Number(response.statusText));
        }
        const repos = await response.json();
        if (!(repos === null || repos === void 0 ? void 0 : repos.items.length)) {
            throw new common_1.HttpException("Repo not found", 404);
        }
        const repo = repos.items[0];
        const existingRepo = await this.reposService.find({
            user_id: user.id,
            project_name: repo.full_name
        });
        if (existingRepo) {
            throw new common_1.HttpException("Repo already exists", 409);
        }
        return this.reposService.create({
            repo: repo,
            user_id: user.id
        });
    }
    async delete(request, params) {
        const { id } = params;
        const { user } = request;
        const existingRepo = this.reposService.find({
            id: id,
            user_id: user.id
        });
        if (!existingRepo) {
            throw new common_1.HttpException("Repo doesn't exist", 404);
        }
        return this.reposService.delete({
            id: id,
            user_id: user.id
        });
    }
};
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)("all"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReposController.prototype, "get", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, repos_dto_1.CreateDTO]),
    __metadata("design:returntype", Promise)
], ReposController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)("delete"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, repos_dto_1.DeleteDTO]),
    __metadata("design:returntype", Promise)
], ReposController.prototype, "delete", null);
ReposController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [repos_service_1.ReposService])
], ReposController);
exports.ReposController = ReposController;
