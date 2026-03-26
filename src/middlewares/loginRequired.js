import jwt from "jsonwebtoken";
import User from "../models/User";
import Aluno from "../models/Aluno";

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ["Login required"],
    });
  }

  try {
    const dados = jwt.verify(authorization, process.env.TOKEN_SECRET);
    const { id, email, role } = dados;

    // 🔹 LOGIN ADMIN / USER
    if (!role || role === "admin") {
      const user = await User.findOne({
        where: { id, email },
      });

      if (!user) {
        return res.status(401).json({
          errors: ["Usuário inválido"],
        });
      }

      req.userId = id;
      req.userEmail = email;
      req.userRole = "admin";

      return next();
    }

    // 🔹 LOGIN ALUNO
    if (role === "aluno") {
      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(401).json({
          errors: ["Aluno inválido"],
        });
      }

      req.userId = id;
      req.userRole = "aluno";

      return next();
    }

    return res.status(401).json({
      errors: ["Token inválido"],
    });
  } catch (error) {
    return res.status(401).json({
      errors: ["Login expirado ou inválido"],
    });
  }
};
