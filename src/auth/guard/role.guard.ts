import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PERMISSION_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const permissions =
      this.reflector.getAllAndOverride(PERMISSION_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) || [];
    const request = context.switchToHttp().getRequest();
    const userPermissions =
      request.user?.role?.permissions?.map((permission) => permission.name) ||
      [];
    const userValidPermissions = permissions.some((permission) =>
      userPermissions.includes(permission),
    );
    return userValidPermissions;
  }
}
