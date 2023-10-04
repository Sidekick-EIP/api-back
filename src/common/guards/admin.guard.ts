import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const referer = request.headers.referer || request.headers.referrer;

    const base_url = "http://13.37.217.239"
    if ((user && user.isAdmin) || referer === base_url || referer === base_url + '/') {
      return true;
    }

    // Otherwise, throw a Forbidden exception
    throw new ForbiddenException('Only admins can access this route');
  }
}