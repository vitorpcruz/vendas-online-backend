import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from 'src/app-auth/dtos/loginPayload.dto';
import { ROLES_KEY } from 'src/decorators/roles.decorators';
import { UserType } from 'src/user/enum/user-type.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const { authorization } = context.switchToHttp().getRequest().headers;

    const loginPayLoad: LoginPayload | undefined = await this.jwtService
      .verifyAsync(authorization, {
        secret: process.env.JWT_SECRET,
      })
      .catch(() => undefined);

    if (!loginPayLoad) return false;

    const verification = requiredRoles.some(
      (role) => role === loginPayLoad.typeUser,
    );

    return verification;
  }
}
