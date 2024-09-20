import { Type } from "class-transformer";
import {
    IsEmail,
    IsString,
    Length
} from "class-validator";

export class CreateDTO {
    @Type(() => String)
    @IsEmail()
    @Length(6, 128)
    email: string;

    @Type(() => String)
    @IsString()
    @Length(4, 128)
    password?: string;
}

export class LoginDTO {
    @Type(() => String)
    @IsEmail()
    @Length(6, 128)
    email: string;

    @Type(() => String)
    @IsString()
    @Length(4, 128)
    password: string;
}