const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bodyData = {
  title: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Il titolo è un campo obbligatorio.",
      bail: true,
    },
    isString: {
      errorMessage: "Il titolo deve essere una stringa.",
      bail: true,
    },
    isLength: {
      errorMessage: "Il titolo deve essere lungo almeno 3 caratteri.",
      options: { min: 3 },
    },
    trim: true,
  },
  description: {
    in: ["body"],
    notEmpty: {
      errorMessage: "La descrizione è un campo obbligatorio.",
      bail: true,
    },
    isString: {
      errorMessage: "La descrizione deve essere una stringa.",
      bail: true,
    },
  },
  visible: {
    in: ["body"],
    isBoolean: {
      errorMessage: "Il campo visibile deve essere booleano.",
      bail: true,
    },
    toBoolean: true,
  },
  img: {
    in: ["body"],
    optional: {
      options: { nullable: true },
    },
    isString: {
      errorMessage: "L'immagine deve essere una stringa.",
      bail: true,
    },
    matches: {
      options: [/.(jpg|jpeg|png|gif)$/i],
      errorMessage:
        "L'immagine deve avere un'estensione valida (jpg, jpeg, png, gif).",
    },
  },
  userId: {
    in: ["body"],
    customSanitizer: {
      options: (value) => {
        if (typeof value === "string") {
          const parsedValue = parseInt(value, 10);
          return isNaN(parsedValue) ? null : parsedValue;
        }
        return value;
      },
    },
    isInt: {
      errorMessage: "L'ID dell'utente deve essere un numero intero.",
      bail: true,
    },
    custom: {
      options: async (value) => {
        if (value === null || value === undefined) {
          throw new Error("L'ID dell'utente deve essere un numero intero.");
        }
        const userId = parseInt(value, 10);
        if (isNaN(userId)) {
          throw new Error("L'ID dell'utente deve essere un numero intero.");
        }
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });
        if (!user) {
          throw new Error(`Non esiste un utente con ID ${userId}.`);
        }
        return true;
      },
    },
  },
  categories: {
    in: ["body"],
    customSanitizer: {
      options: (value) => {
        if (typeof value === "string") {
          return value.split(",").map((id) => parseInt(id.trim(), 10));
        }
        return value.map((id) => parseInt(id, 10));
      },
    },
    isArray: {
      errorMessage:
        "Le categorie devono essere specificate come un array di ID.",
      bail: true,
    },
    custom: {
      options: async (ids) => {
        if (!Array.isArray(ids)) {
          throw new Error(
            "Le categorie devono essere specificate come un array di ID."
          );
        }
        if (ids.length === 0) {
          throw new Error("Devi specificare almeno una categoria per la foto.");
        }
        const notIntegerId = ids.find((id) => isNaN(id));
        if (notIntegerId) {
          throw new Error("Uno o più ID di categoria non sono numeri interi.");
        }
        const categories = await prisma.category.findMany({
          where: { id: { in: ids } },
        });
        if (categories.length !== ids.length) {
          throw new Error("Una o più categorie specificate non esistono.");
        }
        return true;
      },
    },
  },
};

module.exports = {
  bodyData,
};
