// photoController.js

const { PrismaClient } = require("@prisma/client");
const RestError = require("../utils/restError");
const prisma = new PrismaClient();

// Funzione per creare una nuova foto
const store = async (req, res) => {
  const {
    title,
    description,
    visible,
    categories,
    userId: bodyUserId,
  } = req.body;
  const userId = req.userId || bodyUserId;

  console.log("UserId ricevuto nel backend:", userId);

  try {
    const parsedCategories =
      typeof categories === "string" ? JSON.parse(categories) : categories;

    let data = {
      title,
      description,
      visible,
      userId: userId,
    };

    if (req.file) {
      data.img = `${req.protocol}://${req.get("host")}/${req.file.filename}`;
    }

    console.log("Data per la creazione:", data);

    const photo = await prisma.photo.create({
      data: {
        ...data,
        categories: {
          connect: parsedCategories.map((categoryId) => ({ id: categoryId })),
        },
      },
      include: {
        categories: true,
      },
    });

    res.status(201).json(photo);
  } catch (error) {
    console.error("Errore durante la creazione della foto:", error);
    res.status(500).json({ error: "Errore durante la creazione della foto." });
  }
};

// Funzione per ottenere tutte le foto dell'utente loggato
const index = async (req, res, next) => {
  try {
    const photos = await prisma.photo.findMany({
      where: {
        userId: req.userId, // Mostra solo le foto dell'utente loggato
      },
      include: {
        categories: true,
        user: true,
      },
    });
    res.status(200).json(photos);
  } catch (error) {
    console.error(error);
    next(new RestError("Errore durante il recupero delle foto.", 500));
  }
};

// Funzione per ottenere una singola foto
const show = async (req, res, next) => {
  const { id } = req.params;
  try {
    const photo = await prisma.photo.findUnique({
      where: { id: Number(id) },
      include: {
        categories: true,
      },
    });

    if (!photo) {
      return next(new RestError("Foto non trovata.", 404));
    }

    res.status(200).json(photo);
  } catch (error) {
    console.error(error);
    next(new RestError("Errore durante il recupero della foto.", 500));
  }
};

// Funzione per aggiornare una foto esistente
const update = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, visible, categories } = req.body;

  try {
    let data = {
      title,
      description,
      visible,
    };

    // Gestione delle categorie
    if (categories) {
      const parsedCategories =
        typeof categories === "string" ? JSON.parse(categories) : categories;
      data.categories = {
        set: parsedCategories.map((categoryId) => ({ id: categoryId })),
      };
    }

    const photo = await prisma.photo.update({
      where: { id: Number(id) },
      data,
      include: {
        categories: true,
      },
    });

    res.status(200).json(photo);
  } catch (error) {
    console.error(error);
    next(new RestError("Errore durante l'aggiornamento della foto.", 500));
  }
};

// Funzione per eliminare una foto
const destroy = async (req, res, next) => {
  const { id } = req.params;
  try {
    const photo = await prisma.photo.delete({
      where: { id: Number(id), userId: req.userId },
      include: {
        categories: true,
      },
    });

    res.status(200).json({ message: "Foto eliminata con successo.", photo });
  } catch (error) {
    console.error(error);
    next(new RestError("Errore durante l'eliminazione della foto.", 500));
  }
};

module.exports = { store, index, show, update, destroy };
