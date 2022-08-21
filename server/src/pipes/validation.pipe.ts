import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidationException } from '../utils/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metatype, value);
    const errors = await validate(obj);
    
    if(errors.length > 0) {
      let messages = errors.map(err => {
          return `${err.property} -- ${Object.values(err.constraints).join(', ')}`;
      })
    	throw new ValidationException(messages);
    }
    return value
  }
}
