import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtWsAuthGuard implements CanActivate {
    private logger: Logger = new Logger('WsAuthGuard');
    constructor(private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToWs().getData();
        try {
            const token = req.authorization;
            if(!token) {
                throw new Error()
            }

            const user = this.jwtService.verify(token, {secret: process.env.PRIVATE_KEY});
            req.user = user;
            
            return true;
        } catch (error) {
            this.logger.log(error)
            throw new UnauthorizedException({message: 'User is not authorized'});
        }
    }
}