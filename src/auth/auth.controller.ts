import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialDto } from './auth.credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() dto: CredentialDto): Promise<void> {
    return this.authService.signUp(dto);
  }

  @Post('/signin')
  signin(@Body() dto: CredentialDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(dto);
  }

  @Post('/test')
  @HttpCode(200)
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log('user: ', user);
  }
}
