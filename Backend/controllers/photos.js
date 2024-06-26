const { PrismaClient } = require("@prisma/client");
const RestError = require("../utils/restError");
const prisma = new PrismaClient();

const store = async (req, res) => {
  const { title, description, visible, categories, userId } = req.body;
  try {
    const parsedCategories =
      typeof categories === "string" ? JSON.parse(categories) : categories;

    const photo = await prisma.photo.create({
      data: {
        title,
        description,
        visible,
        userId: Number(userId),
        img: req.file ? req.file.filename : null,
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
    console.error(error);
    res.status(500).json({ error: "Errore durante la creazione della foto." });
  }
};

const index = async (req, res, next) => {
  try {
    const photos = await prisma.photo.findMany({
      include: {
        categories: true,
      },
    });
    res.status(200).json(photos);
  } catch (error) {
    console.error(error);
    next(new RestError("Errore durante il recupero delle foto.", 500));
  }
};

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

const update = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, visible, categoryId } = req.body;
  try {
    let data = {
      title,
      description,
      visible,
    };

    if (categoryId) {
      data.categories = {
        set: { id: categoryId },
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

const destroy = async (req, res, next) => {
  const { id } = req.params;
  try {
    const photo = await prisma.photo.delete({
      where: { id: Number(id) },
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
