import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid'

@Injectable()
export class FilesService {

    async createJpgFile(file): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg'
            const filePath = path.resolve(__dirname, '..', 'static')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file)
            return fileName
        } catch (error) {
            console.log(error)
            throw new HttpException('Error occurred while creating file:', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
