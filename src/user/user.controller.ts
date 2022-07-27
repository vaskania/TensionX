import { Body, Controller, HttpException, HttpStatus, Logger, Post, Request } from "@nestjs/common";
import { UserCreateDTO } from "./dto/create-user.dto";
import { UserLoginDTO } from "./dto/user-login.dto";
import { UserService } from "./user.service";
import { UserAlreadyExists } from "./constants/user.constant";

@Controller()
export class UserController {
  private readonly log = new Logger();

  constructor(
    private readonly userService: UserService
  ) {
  }

  @Post("/sign-up")
  async createUser(@Body() user: UserCreateDTO): Promise<{ message: string }> {
    try {
      await this.userService.createUser(user);
      return {
        message: ` created successfully`
      };
    } catch (error) {
      this.log.error(UserAlreadyExists);
      throw new HttpException(UserAlreadyExists, HttpStatus.BAD_REQUEST);

    }
  }

  @Post("/login")
  async loginUser(@Body() login: UserLoginDTO): Promise<{ access_token: string }> {
    try {
      return { access_token: "token" };
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  }
}