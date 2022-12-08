import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid'

@Injectable()
export class FilesService {
    private logger: Logger = new Logger('FilesService');
    async createJpgFile(file: ArrayBuffer): Promise<string> {
        try {
            
            this.logger.log(file)
            const fileName = uuid.v4() + '.jpg'
            const filePath = path.resolve(__dirname, '..', 'static')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            const buff = Buffer.from(file);
            fs.writeFileSync(path.join(filePath, fileName), buff);

            return fileName;
        } catch (error) {
            this.logger.log(error);
            throw new HttpException('Error occurred while creating file:', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
