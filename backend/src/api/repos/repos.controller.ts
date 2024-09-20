import { Body, HttpException, Post, UseGuards, Request, Controller } from "@nestjs/common";
import { ReposService } from "../../core/services/repos/repos.service";
import { AuthGuard } from "../../core/guards/auth.guard";
import { CreateDTO, DeleteDTO } from "./repos.dto";

@Controller()
export class ReposController {

    private baseUrl = "https://api.github.com/search/repositories";

    constructor(
        private reposService: ReposService
    ) {}

    @UseGuards(AuthGuard)
    @Post("all")
    public async get(@Request() request, @Body() params): Promise<any> {
        const { user } = request;

        return this.reposService.all({
            user_id: user.id
        })
    }

    @UseGuards(AuthGuard)
    @Post("create")
    public async create(@Request() request, @Body() params: CreateDTO): Promise<any> {
        const { name } = params;
        const { user } = request;

        //Make search query and search for repos
        const query = `${ encodeURIComponent(name) }+in:name&per_page=1&page=1`;
        const url = `${ this.baseUrl }?q=${ query }`;

        //Find repo and handle errors
        const response: any = await fetch(url);
        if (!response.ok) {
            throw new HttpException(`Error: ${ response.status }`, Number(response.statusText));
        }

        const repos = await response.json();
        if(!repos?.items.length) {
            throw new HttpException("Repo not found", 404);
        }
        const repo = repos.items[0];

        //Check if repo already exists with current name and user_id
        const existingRepo = await this.reposService.find({
            user_id: user.id,
            project_name: repo.full_name
        })
        if(existingRepo) {
            throw new HttpException("Repo already exists", 409);
        }

        return this.reposService.create({
            repo: repo,
            user_id: user.id
        })
    }

    @UseGuards(AuthGuard)
    @Post("delete")
    public async delete(@Request() request, @Body() params: DeleteDTO): Promise<any> {
        const { id } = params;
        const { user } = request;

        const existingRepo = this.reposService.find({
            id: id,
            user_id: user.id
        })
        if(!existingRepo) {
            throw new HttpException("Repo doesn't exist", 404);
        }

        return this.reposService.delete({
            id: id,
            user_id: user.id  
        })
    }

}