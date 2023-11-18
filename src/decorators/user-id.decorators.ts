import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { authorizationToLoginPayload } from '../utils/base-64-converter';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const { authorization } = ctx.switchToHttp().getRequest().headers;
  const loginPayLoad = authorizationToLoginPayload(authorization);
  return loginPayLoad?.id;
});
