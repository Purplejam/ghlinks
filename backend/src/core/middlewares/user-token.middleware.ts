import { Injectable, NestMiddleware, HttpException } from "@nestjs/common";
import { Request, NextFunction } from "express";
import { ExtractJwt } from "passport-jwt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AccessTokenMiddleware implements NestMiddleware {

    constructor(
        private jwtService: JwtService,
    ) {}

    public async use(request: Request, next: NextFunction): Promise<void> {
        const Extractor = ExtractJwt.fromAuthHeaderAsBearerToken();
        const userToken = Extractor(request);
        if(!userToken) {
            throw new HttpException("Missing access token", 403);
        }

        const payload = this.jwtService.decode(userToken);
        console.log(payload);

        request.identification = {
            ...request.identification,
            userToken: userToken
        }

        return next();
    }

}