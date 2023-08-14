import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Roles } from 'src/auth/roles/roles.decorator';
import { jwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInnDto: Record<string, any>) {
    return this.usersService.signIn(signInnDto.userName, signInnDto.password);
  }

  @Post()
  async create(@Body() user): Promise<User> {
    return this.usersService.create(user);
  }

  @Roles('admin')
  @UseGuards(jwtAuthGuard, RoleGuard)
  @Get('profile')
  profile(@Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(req.user);
  }
}
