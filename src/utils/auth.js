import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

export function generateToken(user) {
  // user = { id, name, admin }
  return jwt.sign(
    { id: user.id, name: user.name, admin: user.admin },
    authConfig.secret,
    { expiresIn: '1h' }
  );
}