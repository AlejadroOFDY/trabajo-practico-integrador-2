// Este middleware va verificar qué le pertenece al usuario y si es un admin

export const ownMiddleware = (req, res, next) => {
  try {
    // Obtenemos el id del recurso de los parámetros de la url
    const resourceUserId = req.params.id;
    // Dependiendo de si el usuario es dueño del recurso o si es un admin se permite la operación

    if (req.user.id !== resourceUserId && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Acceso denegado, no eres el propietario de este recurso",
      });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "Error interno del servidor" });
  }
};
