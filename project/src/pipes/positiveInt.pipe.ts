// id가 float로 오면 무조건 양수 int로 바꾸기.
// 안되면 오류처리도 하고.

import { HttpException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number) {
    console.log(value);
    if (value < 0) {
      throw new HttpException('value should be positive', 400);
    }
    return value;
  }
}
