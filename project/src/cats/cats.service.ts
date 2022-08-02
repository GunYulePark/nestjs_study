import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}
  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    // email 중복 체크
    // catModel에서 email이 일치하는 게 있는지.
    const isCatExist = await this.catModel.exists({ email });

    if (isCatExist) {
      // throw new HttpException('해당하는 고양이는 이미 존재합니다.', 403); // 밑에와 동일
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }
    // password 암호화. 개발자도 확인할 수 없게.
    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
