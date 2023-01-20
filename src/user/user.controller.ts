import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('SalariedUser')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getsalaryss')
  async getsalaryss() {
    return this.userService.getSalarySS();
  }

  @Get('getssbycontract')
  async getsalarybycontract() {
    return this.userService.getSSbyContract();
  }

  @Get('getssbydepartment')
  async getssbydepartment() {
    return this.userService.getSSbyDepartment();
  }

  @Get('getssbysubdepartment')
  async getssbysubdepartment() {
    return this.userService.getSSbyDepartmentandSub();
  }

  @Post('create')
  create(@Body() bodyData: CreateUserDto): Promise<any> {
    return this.userService.create(bodyData);
  }

  @Post('multicreate')
  multicreate(@Body() bodyData: CreateUserDto[]): Promise<any> {
    return this.userService.createMultiple(bodyData);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.userService.deletebByName(name);
  }
}
