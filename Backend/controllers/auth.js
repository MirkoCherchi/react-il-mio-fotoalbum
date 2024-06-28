const { PrismaClient } = require("@prisma/client");
const errorHandler = require("../middlewares/errorHandler.js");
const generateToken = require("../utils/generateToken.js");
const { hashPassword, comparePassword } = require("../utils/password.js");
const RestError = require("../utils/restError.js");

const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const userImg = req.file
      ? `${req.protocol}://${req.get("host")}/${req.file.filename}`
      : null;

    const hashedPassword = await hashPassword(password);

    const data = {
      email,
      name,
      password: hashedPassword,
      img_path: userImg,
    };

    const user = await prisma.user.create({ data });

    const token = generateToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    res.json({ token, data: user });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    const errorEmailPassw = new RestError(`Email o password errati.`, 400);

    if (!user) {
      throw errorEmailPassw;
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw errorEmailPassw;
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });
    res.json({ token, data: user });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

module.exports = {
  register,
  login,
};
