import { Body, Controller, HttpException, HttpStatus, Logger, Post, Request, UseGuards } from "@nestjs/common";
import { UserCreateDTO } from "./dto/create-user.dto";
import { UserLoginDTO } from "./dto/user-login.dto";
import { UserService } from "./user.service";
import { AuthService } from "../auth/auth.service";
import { LocalAuthGuard } from "../auth/guards/local-auth.guard";

@Controller()
export class UserController {
  private readonly log = new Logger();

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {
  }

  @Post("/sign-up")
  async createUser(@Body() user: UserCreateDTO): Promise<{ message: string }> {
    try {
      const newUser = await this.userService.createUser(user);
      return {
        message: `${newUser.email} created successfully`
      };
    } catch (error) {
      this.log.error(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async loginUser(@Request() req) {
    return req.user;
  }
}