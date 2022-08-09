import { CanActivate, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class devEndpointGuard implements CanActivate {
    constructor() { }

    // Activates endpoint if app is running in development mod
    canActivate(): boolean | Promise<boolean> | Observable<boolean> {
        try {
            if (process.env.NODE_ENV == 'dev') return true;
        } catch (error) {
            throw new UnauthorizedException({message: 'This endpoint is forbidden'});
        }
    }
}