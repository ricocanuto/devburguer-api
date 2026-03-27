const adminMiddleware = (request, response, next) => {
  if (!request.isUserAdmin) {
    return response.status(403).json({ error: 'User is not admin' });
  }

  return next();
};

export default adminMiddleware;