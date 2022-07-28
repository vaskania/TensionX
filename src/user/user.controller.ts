import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post, Request, UseGuards } from "@nestjs/common";
import { UserCreateDTO } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { LocalAuthGuard } from "../auth/guards/local-auth.guard";
import { Roles } from "../decorator/role.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../guard/roles.guard";

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

  @Roles("guest", "user", "supervisor", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/guest")
  async getGuest() {
    return { message: "This is a guest tab" };
  }

  @Roles("user", "supervisor", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/user")
  async getUser() {
    return { message: "This is a user tab" };
  }

  @Roles("supervisor", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/supervisor")
  async getSupervisor() {
    return { message: "This is a supervisor tab" };
  }

  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/admin")
  async getAdmin() {
    return { message: "This is a admin tab" };
  }
}