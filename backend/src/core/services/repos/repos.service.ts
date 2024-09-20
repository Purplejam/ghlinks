import { Injectable } from "@nestjs/common";
import ReposModel from "../../../database/psql/models/repos.model";
import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import { ICreateParams, IAllParams, IDeleteParams } from "./repos.interfaces";

@Injectable()
export class ReposService {
    constructor(
        @InjectModel(ReposModel)
        private reposModel: typeof ReposModel
    ) {}

    public async find(where: WhereOptions) {
        return this.reposModel.findOne({
            where: where,
            raw: true
        })
    }

    public async create(params: ICreateParams) {
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
        })
    }

    public async all(params: IAllParams) {
        const { user_id } = params;

        return this.reposModel.findAll({
            where: {
                user_id: user_id
            },
            order: [
                [ "id", "DESC" ]
            ]
        })
    }

    public async delete(params: IDeleteParams) {
        const { id, user_id } = params;

        return this.reposModel.destroy({
            where: {
                id: id,
                user_id: user_id
            }
        }).then(result => Boolean(result)) 
    }
}