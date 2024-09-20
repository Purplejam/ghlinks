import { Type } from "class-transformer";
import { IsNumber, IsString, MaxLength } from "class-validator";

export class CreateDTO {
    @Type(() => String)
    @IsString()
    @MaxLength(255)
    name: string;
}

export class DeleteDTO {
    @Type(() => Number)
    @IsNumber()
    id: number;
}