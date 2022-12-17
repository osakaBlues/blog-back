import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialDto } from './auth.credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: CredentialDto): Promise<void> {
    const { name, password } = dto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      name,
      password: hashedPassword,
    });

    const dup = await this.userRepository.findOneBy({ name });
    if (dup) throw new ConflictException('Username already exists');

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException(error.code);
      }
    }
  }

  async signIn(dto: CredentialDto): Promise<{ accessToken: string }> {
    const { name, password } = dto;
    const user = await this.userRepository.findOneBy({ name });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { name };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
