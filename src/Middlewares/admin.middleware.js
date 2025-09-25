export const adminMiddleware = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
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
