const paramId = {
  id: {
    in: ["params"],
    isInt: {
      errorMessage: "ID deve essere un numero intero",
      bail: true,
    },
    toInt: true,
  },
};

module.exports = {
  paramId,
};
