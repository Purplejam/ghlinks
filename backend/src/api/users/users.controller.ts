import { Body, HttpException, Post, UseGuards, Request, Controller} from "@nestjs/common";
import { UsersService } from "../../core/services/users/users.service";
import { CreateDTO, LoginDTO } from "./users.dto";
import { AuthGuard } from "../../core/guards/auth.guard";

@Controller("api/users")
export class UsersController {

    constructor(private usersService: UsersService) {}

    @UseGuards(AuthGuard)
    @Post("get-myself")
    public async getMySelf(@Request() request): Promise<any> {
        return request.user;
    }

    @Post("create")
    public async create(@Body() params: CreateDTO): Promise<any> {
        const { email, password } = params;
        const existingUser = await this.usersService.find({
            email: email
        })
        if(existingUser) {
            throw new HttpException(`User with email ${ email } already exists`, 400);
        }

        const user = await this.usersService.create({
            email: email,
            password: password
        })
        if(!user) {
            throw new HttpException("Bad request", 400);
        }

        return user;
    }

    @Post("login")
    public async login(@Body() params: LoginDTO): Promise<any> {
        const user = await this.usersService.login({
            email: params.email,
            password: params.password
        })
        if(!user) {
            throw new HttpException("Login credentials is incorrect", 401)
        }

        return user;
    }

}