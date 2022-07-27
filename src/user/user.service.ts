import { Injectable } from "@nestjs/common";
import { UserCreateDTO } from "./dto/create-user.dto";
import { HashPassword } from "../utils/crypto";
import { InjectRepository } from "@nestjs/typeorm";
import { User as UserEntity } from "../typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly hashPassword: HashPassword
  ) {
  }

  async createUser(user: UserCreateDTO): Promise<any> {
    const findExistUser = await this.userRepository.findOne({
      where: {
        email: user.email
      }
    });
    if (findExistUser) throw  new Error();
    if (!findExistUser) {
      const { hash, salt } = await this.hashPassword.hashPassword(
        user.password
      );
      const updatedData = { ...user, password: hash, salt };
      const newUser = this.userRepository.create(updatedData);
      return this.userRepository.save(newUser);
    }
  }
}