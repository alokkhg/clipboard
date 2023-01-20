import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { Users } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private jwt: JwtService,
  ) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwt.signAsync(payload),
    };
  }

  async validateuser(username: string, password: string): Promise<any> {
    const userFound = await this.userRepository.findOneBy({
      username: username,
    });

    if (!userFound) {
      throw new UnauthorizedException();
    }

    if (userFound) {
      if (await bcrypt.compare(password, userFound.password)) {
        const { password, ...result } = userFound;
        return result;
      }
      return null;
    }
    return null;
  }

  async signup(user: UserDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    try {
      return await this.userRepository.save(user);
    } catch (err) {
      console.log(`Error while creating users is ${err}`);
    }
  }
}
