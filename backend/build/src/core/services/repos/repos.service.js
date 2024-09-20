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
exports.ReposService = void 0;
const common_1 = require("@nestjs/common");
const repos_model_1 = require("../../../database/psql/models/repos.model");
const sequelize_1 = require("@nestjs/sequelize");
let ReposService = class ReposService {
    constructor(reposModel) {
        this.reposModel = reposModel;
    }
    async find(where) {
        return this.reposModel.findOne({
            where: where,
            raw: true
        });
    }
    async create(params) {
        const { repo, user_id } = params;
        return this.reposModel.create({
            user_id: user_id,
            project_name: repo.full_name,
            owner: repo.owner.login,
            project_url: repo.html_url,
            forks: repo.forks_count,
            open_issues: repo.open_issues,
            stars: repo.stargazers_count,
            created_at: Date.now()
        });
    }
    async all(params) {
        const { user_id } = params;
        return this.reposModel.findAll({
            where: {
                user_id: user_id
            },
            order: [
                ["id", "DESC"]
            ]
        });
    }
    async delete(params) {
        const { id, user_id } = params;
        return this.reposModel.destroy({
            where: {
                id: id,
                user_id: user_id
            }
        }).then(result => Boolean(result));
    }
};
ReposService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(repos_model_1.default)),
    __metadata("design:paramtypes", [Object])
], ReposService);
exports.ReposService = ReposService;
