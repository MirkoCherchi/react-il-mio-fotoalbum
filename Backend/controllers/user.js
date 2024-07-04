const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const RestError = require("../utils/restError");

const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return res.status(404).json({ error: "Utente non trovato" });
    }

    const photoCount = await prisma.photo.count({
      where: {
        userId: parseInt(userId),
      },
    });

    const userProfile = {
      ...user,
      photoCount: photoCount,
    };

    res.json({ data: userProfile });
  } catch (error) {
    console.error("Errore durante il recupero del profilo utente:", error);
    res.status(500).json({ error: "Errore interno del server" });
  }
};

module.exports = {
  getUserProfile,
};
