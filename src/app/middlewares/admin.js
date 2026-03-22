const adminMiddleware = (request, response, next) => {
  const isUserAdmin = request.isUserAdmin;

  if (!isUserAdmin) {
    return response.status(401).json();
  }

  return next();
};

export default adminMiddleware;
