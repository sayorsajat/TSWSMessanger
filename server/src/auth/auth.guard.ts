import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    private logger: Logger = new Logger('AuthGuard');
    constructor(private jwtService: JwtService) { }
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if(bearer !== 'Bearer' || !token) {
                this.logger.log('Bearer', bearer, ' and ', 'token', token)
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