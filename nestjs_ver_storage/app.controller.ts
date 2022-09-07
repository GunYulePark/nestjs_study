import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

//* localhost:8000/cats
@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}

  //* localhost:8000/cats/hello
  @Get('hello/:id/:name')
  getHello(
    @Req() req: Request,
    @Body() Body,
    //Body는 param과 달리 Dto를 선언해서
    // validation을 평가할 수 있다.(필수 request 요청, 악의적인 request 요청 거를 수 있다.)
    @Param() param: { id: string; name: string },
  ): string {
    // console.log(req);
    // console.log(param);
    // return 'hello world';
    // 책임 분리하고 싶으면, body, param을 getHello()에 넘겨서 사용하자.
    return this.appService.getHello();
  }
}
