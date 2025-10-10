import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET; // defina no .env


export function verifyToken(token) {
  try {    
    const decoded = jwt.verify(token, jwtSecret);
    return { valid: true, decoded };
  } catch (err) {
    let errorMessage = "Token inválido";

    if (err.name === "TokenExpiredError") {
      errorMessage = "Token expirado";
    } else if (err.name === "JsonWebTokenError") {
      errorMessage = "Assinatura do token inválida";
    } else if (err.name === "NotBeforeError") {
      errorMessage = "Token ainda não é válido (nbf)";
    }
   
    return { valid: false, error: errorMessage };
  }
}
