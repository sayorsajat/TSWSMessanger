import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid'
import axios from 'axios';

@Injectable()
export class FilesService {
    private logger: Logger = new Logger('FilesService');


    async createJpgFile(file: ArrayBuffer): Promise<string> {
        try {
            
            const fileName = uuid.v4() + '.jpg'
            const filePath = path.resolve(__dirname, '..', 'static')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            
            const buff = Buffer.from(file);

            const $host = axios.create({
                baseURL: "http://localhost:6001"
            })

            const {data} = await $host.post("/resize", {Buff: buff.toString("base64")})

            fs.writeFileSync(path.join(filePath, fileName), Buffer.from(data, "base64"));

            return fileName;
        } catch (error) {
            this.logger.log(error);
            throw new HttpException('Error occurred while creating file:', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
