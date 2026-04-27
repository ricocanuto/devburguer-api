import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

const authMiddleware = (request, response, next) => {
  console.log('HEADER AUTH:', request.headers.authorization);
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ error: 'Token not provided' });
 }

 const parts = authToken.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return response.status(401).json({ error: 'Formato de token inválido' });
  }

  const token = parts[1];

    try {
  const decoded = jwt.verify(token, authConfig.secret);

  console.log('TOKEN OK:', decoded);

  request.userId = decoded.id;
  request.userName = decoded.name;
  request.isUserAdmin = !!decoded.admin;

  return next();
} catch (error) {
  console.log('TOKEN ERROR:', error.message);
  
  return response.status(401).json({ error: 'Token is invalid' });
}
};

export default authMiddleware;
