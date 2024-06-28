module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.error("Token non presente nella richiesta");
    throw new RestError("Token vuoto", 401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Errore nella verifica del token:", err);
      throw new RestError("Token non valido", 403);
    }

    console.log("Token decodificato:", decoded);

    if (!decoded.userId) {
      console.error("Nessun userId trovato nel token");
      throw new RestError("Token non contiene userId", 403);
    }

    req.userId = decoded.userId;
    req.user = decoded;

    next();
  });
};
