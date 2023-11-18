import { LoginPayload } from '../app-auth/dtos/loginPayload.dto';

export const authorizationToLoginPayload = (
  authorization: string,
): LoginPayload | undefined => {
  const authorizationSplitted = authorization.split('.');

  if (authorizationSplitted.length < 3 || !authorizationSplitted[1])
    return undefined;

  const conversion = JSON.parse(
    Buffer.from(authorizationSplitted[1], 'base64').toString('ascii'),
  );

  return conversion;
};
