import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthWsFakeware {
    private logger: Logger = new Logger('WsAuthMiddleware');
    constructor(private jwtService: JwtService) { }
    
    isLegitWSMessage(req: object): boolean {
        try {
            const token = req["authorization"];
            if(!token) {
                throw new Error()
            }

            const user = this.jwtService.verify(token, {secret: process.env.PRIVATE_KEY});

        } catch (error) {
            this.logger.log(error)
            
            return false;
        }
        return true;
    }
}
