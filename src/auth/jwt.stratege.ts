import { Injectable } from '@nestjs/common/decorators';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: 'Secret1234',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any) {
    const { id } = payload;
    const user: User = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
