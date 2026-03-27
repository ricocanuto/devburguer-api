import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

const authMiddleware = (request, response, next) => {
  const authToken = request.headers.authorization;
// TESTE TEMPORÁRIO: Ignore o que vem do Insomnia e use o token do Ricardo direto aqui
  // Cole o token do Ricardo entre as aspas abaixo:
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlZjVkNmQ2LWYyMzUtNDE0My1hMWMyLWIzY2IyZjVlNDFiNiIsIm5hbWUiOiJSaWNhcmRvIiwiYWRtaW4iOnRydWUsImlhdCI6MTc3NDQ4NDQyOCwiZXhwIjoxNzc0OTE2NDI4fQ.GpwpqGQGaR6HN7U3tdnCcS4uddXSww9EuxDLqZlNg28";
  if (!authToken) {
    return response.status(401).json({ error: 'Token not provided' });
 }

 const parts = authToken.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return response.status(401).json({ error: 'Formato de token inválido' });
  }

  const token = parts[1];

    try {
    // jwt.verify retorna o payload decodificado
    const decoded = jwt.verify(token, authConfig.secret);

    request.userId = decoded.id;
    request.userName = decoded.name;
    request.isUserAdmin = !!decoded.admin; // lembre-se de incluir 'admin' no token
    request.user = decoded; //opcional: payload completo para usos futuros
    
    return next();
  } catch (_err) {
    return response.status(401).json({ error: 'Token is invalid' });
  }
};

export default authMiddleware;
