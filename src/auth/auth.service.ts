import { Injectable } from "@nestjs/common";
import { HashPassword } from "../utils/crypto";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User as UserEntity } from "../typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly hashPassword: HashPassword,
    private readonly jwtService: JwtService
  ) {
  }

  async validateUser(
    username: string,
    pass: string
  ): Promise<{ username: string; _id: string; role: string } | null | any> {
    const user = await this.userRepository.findOne({
      where: {
        email: username
      }
    });
    if (!user) {
      return null;
    }


    const userMatch = await this.hashPassword.hashPassword(pass, user.salt);
    if (userMatch.hash === user.password) {
      return {
        access_token: this.jwtService.sign({
          email: user.email,
          role: user.role
        }, { secret: process.env.JWT_SECRET })
      };
    }
    return null;
  }
}