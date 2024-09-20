import { Injectable } from "@nestjs/common";
import UsersModel from "../../../database/psql/models/users.model";
import { InjectModel } from "@nestjs/sequelize";
import { hash, compare } from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { IFindParams, ILoginParams, IRegisterParams, IUserEntity } from "./users.interfaces";

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(UsersModel)
        private usersModel: typeof UsersModel,
        private jwtService: JwtService
    ) {}

    public async find(params: IFindParams): Promise<any> {
        const { email } = params;

        return this.usersModel.findOne({
            where: {
                email: email
            }
        })
    }

    public async login(params: ILoginParams): Promise<any> {
        const { email, password } = params;
        const user = await this.usersModel.findOne({
            where: {
                email: email
            },
            raw: true
        })
        if(!user) {
            return null;
        }

        const isEquals = await this.comparePasswords(
            password,
            user.password
        )
        if(!isEquals) {
            return null;
        }

        const payload = { 
            id: user.id, email: user.email 
        }
        const userToken = await this.jwtService.signAsync(payload);

        return {
            user: this.excludePassword(user), 
            userToken: userToken
        }
    }

    public async create(params: IRegisterParams): Promise<any> {
        const { email } = params;
        const password = await this.encryptPassword(params.password);

        const user = await this.usersModel.create({
                email: email,
                password: password
            }
        )
        if(!user) {
            return;
        }

        const payload = { 
            id: user.id, email: user.email 
        }
        const userToken = await this.jwtService.signAsync(payload);

        return {
            user: this.excludePassword(user), 
            userToken: userToken
        }
    }

    public async comparePasswords(password: string, passwordHash: string): Promise<boolean> {
        return compare(password, passwordHash);
    }

    private async encryptPassword(password: string): Promise<string> {
        return hash(
            password,
            process.env.BCRYPT_PASSWORD_SALT
        )
    }

    public excludePassword(user: IUserEntity) {
        if(user) {
            delete user.password;
        }

        return user;
    }


}