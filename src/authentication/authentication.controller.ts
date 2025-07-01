import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './register.dto';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import RequestWithUser from './requestWithUser.interface';
import { Response } from 'express';
import { JwtAuthenticationGuard } from './jwtAuthentication.guard';
import { ExcludeNullInterceptor } from '../utils/excludeNullInterceptor';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseInterceptors(ExcludeNullInterceptor)
  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    console.log(registrationData);
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async login(@Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    request.res.setHeader('Set-Cookie', cookie);
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    return response.sendStatus(200);
  }
}
