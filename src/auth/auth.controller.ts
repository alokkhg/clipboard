import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

import { UserDto } from './dto/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('User')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiProperty()
  @Post('signup')
  signup(@Body() userData: UserDto) {
    return this.authService.signup(userData);
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: UserDto })
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }
}
