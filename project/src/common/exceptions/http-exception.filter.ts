import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | {
          error: string;
          statusCode: number;
          message: string | string[];
        };
    //error가 object를 받을 땐, nest 자체에서 json 형식으로 전달하는 exception이기 때문에

    // express에선 다음과 같았다.
    // res.status(400).send({ asdfsdf; })
    if (typeof error === 'string') {
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        error, // error: error // key와 value 같으면 생략 가능
      });
    } else {
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        ...error, // string[]이나 json의 것들을 편하게 꺼내쓸 수 있도록 비구조화 문법을 사용.
      });
    }
  }
}
