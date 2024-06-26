const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const store = async (req, res) => {
  const { title, description, visible, categories } = req.body;
  try {
    const photo = await prisma.photo.create({
      data: {
        title,
        description,
        visible,
        categories: {
          connect: categories.map((categoryId) => ({ id: categoryId })),
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

const index = async (req, res) => {
  try {
    const photos = await prisma.photo.findMany({
      include: {
        categories: true,
      },
    });
    res.status(200).json(photos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore durante il recupero delle foto." });
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    const photo = await prisma.photo.findUnique({
      where: { id: Number(id) },
      include: {
        categories: true,
      },
    });

    if (!photo) {
      return res.status(404).json({ error: "Foto non trovata." });
    }

    res.status(200).json(photo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore durante il recupero della foto." });
  }
};

const update = async (req, res) => {
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
    res
      .status(500)
      .json({ error: "Errore durante l'aggiornamento della foto." });
  }
};

const destroy = async (req, res) => {
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
    res
      .status(500)
      .json({ error: "Errore durante l'eliminazione della foto." });
  }
};

module.exports = { store, index, show, update, destroy };
