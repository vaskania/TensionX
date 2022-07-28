import { Injectable } from "@nestjs/common";
import { UserCreateDTO } from "./dto/create-user.dto";
import { HashPassword } from "../utils/crypto";
import { InjectRepository } from "@nestjs/typeorm";
import { User as UserEntity } from "../typeorm";
import { Repository } from "typeorm";
import { PasswordNotMatched, UserAlreadyExists } from "./constants/user.constant";
import { IUserCreated } from "./interfaces";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly hashPassword: HashPassword
  ) {
  }

  async getUser(email) {
    const user = this.userRepository.findOne({
      where: {
        email
      }
    });
    return user;
  }

  async createUser(user: UserCreateDTO): Promise<IUserCreated> {
    if (user.password !== user.confirmPassword) {
      throw new Error(PasswordNotMatched);
    }
    const findExistUser = await this.getUser(user.email);
    if (findExistUser) throw  new Error(UserAlreadyExists);
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