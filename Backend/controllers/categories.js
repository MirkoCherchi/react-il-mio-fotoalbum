const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const store = async (req, res) => {
  const { name } = req.body;

  try {
    const existingCategory = await prisma.category.findFirst({
      where: { name },
    });

    if (existingCategory) {
      return res.status(400).json({ error: "Categoria già esistente." });
    }

    const category = await prisma.category.create({
      data: {
        name,
      },
    });
    res.status(201).json(category);
  } catch (error) {
    console.error("Errore durante la creazione della categoria:", error);
    res
      .status(500)
      .json({ error: "Errore durante la creazione della categoria." });
  }
};

const index = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Errore durante il recupero delle categorie:", error);
    res
      .status(500)
      .json({ error: "Errore durante il recupero delle categorie." });
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!category) {
      return res.status(404).json({ error: "Categoria non trovata." });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Errore durante il recupero della categoria:", error);
    res
      .status(500)
      .json({ error: "Errore durante il recupero della categoria." });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.delete({
      where: { id: Number(id) },
    });
    res
      .status(200)
      .json({ message: "Categoria eliminata con successo.", category });
  } catch (error) {
    console.error("Errore durante l'eliminazione della categoria:", error);
    res
      .status(500)
      .json({ error: "Errore durante l'eliminazione della categoria." });
  }
};
const getPhotosByCategory = async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const photos = await prisma.photo.findMany({
      where: {
        categories: {
          some: {
            id: Number(categoryId),
          },
        },
      },
      include: {
        categories: true,
        user: true,
      },
    });

    if (!photos.length) {
      return res
        .status(200)
        .json({
          message: "Nessuna foto trovata per questa categoria.",
          photos: [],
        });
    }

    res.status(200).json(photos);
  } catch (error) {
    console.error(
      `Errore durante il recupero delle foto per la categoria ${categoryId}:`,
      error
    );
    next(
      new RestError(
        "Errore durante il recupero delle foto per la categoria.",
        500
      )
    );
  }
};

module.exports = { store, index, show, destroy, getPhotosByCategory };
