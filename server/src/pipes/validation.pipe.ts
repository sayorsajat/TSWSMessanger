import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidationException } from '../exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metatype, value);
    const errors = await validate(obj);
    
    if(errors.length) {
        const messages = errors.map(err => {
            return `${err.property} -- `
        })
    	throw new ValidationException(messages);
    }
    return value
  }
}
