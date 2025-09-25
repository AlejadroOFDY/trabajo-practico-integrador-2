import { UserModel } from "../Models/user.model.js";
import { comparePassword, hashPassword } from "../Helpers/bcrypt.helper.js";
import { generateToken } from "../Helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, role, profile } = req.body;

    const hashedPassword = await hashPassword(password);

    const existingUser = await UserModel.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ msg: "Nombre de usuario ya registrado" });
    }
    const existingEmail = await UserModel.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ msg: "Email ya registrado" });
    }

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      profile,
      role,
    });
    return res.status(201).json({ msg: "Usuario registrado existosamente" });
  } catch (error) {
    return res.status(500).json({ smg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }
    const token = generateToken({
      id: user.id,
      username: user.username,
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.status(200).json({ msg: "Login Exitoso" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del Servidor" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ ok: true, msg: "Logout exitoso" });
};

export const getProfile = async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json({
      ok: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { username, email, profile } = req.body;
    const userId = req.user.id;

    // Verificar unicidad de username/email
    if (username || email) {
      const existingUser = await UserModel.findOne({
        $or: [{ email }, { username }],
        _id: { $ne: userId },
      });

      if (existingUser) {
        return res.status(400).json({
          ok: false,
          msg: "El username o email ya está en uso",
        });
      }
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { username, email, profile },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      ok: true,
      msg: "Perfil actualizado exitosamente",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
