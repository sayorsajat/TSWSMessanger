export type req_method = "POST" | "GET" | "PUT" | "PATCH" | "DELETE"

export class HttpReqOption {
    hostname: 'localhost';
    port: number;
    path: string;
    method: req_method;
    headers: object;

    constructor(path: string, method: req_method, content: any) {
        this.hostname = 'localhost';
        this.port = 5000;
        this.path = path;
        this.method = method;
        this.headers = {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(content)
        }
        
    }
    
}