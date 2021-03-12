import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCreditialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCreditialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCreditialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCreditialsDto);
  }
}
