const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bodyData = {
  title: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Title è un campo obbligatorio.",
      bail: true,
    },
    isString: {
      errorMessage: "Title deve essere una stringa.",
      bail: true,
    },
    isLength: {
      errorMessage: "Title deve essere di almeno 3 caratteri",
      options: { min: 3 },
    },
    trim: true,
  },
  description: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Description è un campo obbligatorio.",
      bail: true,
    },
    isString: {
      errorMessage: "Description deve essere una stringa.",
      bail: true,
    },
  },
  visible: {
    in: ["body"],
    isBoolean: {
      errorMessage: "Visible deve essere un booleano.",
    },
    toBoolean: true,
  },
  img: {
    in: ["body"],
    optional: {
      options: { nullable: true },
    },
    isString: {
      errorMessage: "img deve essere una stringa.",
      bail: true,
    },
    matches: {
      options: [/.(jpg|jpeg|png|gif)$/i],
      errorMessage: "img deve avere un'estensione valida (jpg, jpeg, png, gif)",
    },
  },
  userId: {
    in: ["body"],
    notEmpty: {
      errorMessage: "User ID è un campo obbligatorio.",
      bail: true,
    },
    isInt: {
      errorMessage: "User ID deve essere un numero intero.",
    },
    toInt: true,
  },
  categories: {
    in: ["body"],
    customSanitizer: {
      options: (value) => {
        if (typeof value === "string") {
          try {
            return JSON.parse(value);
          } catch (e) {
            throw new Error("Categories deve essere un array valido.");
          }
        }
        return value;
      },
    },
    isArray: {
      errorMessage: "Categories deve essere un array",
      bail: true,
    },
    custom: {
      options: async (ids) => {
        if (!Array.isArray(ids)) {
          throw new Error("Categories deve essere un array");
        }
        if (ids.length === 0) {
          throw new Error("Una foto deve avere almeno una categoria.");
        }
        const notIntegerId = ids.find((id) => isNaN(id));
        if (notIntegerId) {
          throw new Error("Uno o più ID non sono dei numeri interi.");
        }
        const categories = await prisma.category.findMany({
          where: { id: { in: ids } },
        });
        if (categories.length !== ids.length) {
          throw new Error("Una o più categories specificate non esistono.");
        }
        return true;
      },
    },
  },
};

module.exports = {
  bodyData,
};
