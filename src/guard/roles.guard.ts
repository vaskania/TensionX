import { CanActivate, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector
  ) {
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const roleMatch = roles.includes(user.role);
    if (!roleMatch) {
      throw new HttpException("You have no access to this page", HttpStatus.FORBIDDEN);
    }
    return true;
  }
}