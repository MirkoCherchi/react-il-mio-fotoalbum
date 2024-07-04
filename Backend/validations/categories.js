const { body } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bodyData = [
  body("name")
    .notEmpty()
    .withMessage("Name è un campo obbligatorio.")
    .isString()
    .withMessage("Name deve essere una stringa.")
    .isLength({ min: 3 })
    .withMessage("Name deve essere di almeno 5 caratteri")
    .custom(async (name) => {
      const existingCategory = await prisma.category.findUnique({
        where: { name },
      });
      if (existingCategory) {
        throw new Error("Name deve essere unico.");
      }
    }),
];

module.exports = {
  bodyData,
};
