const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: " API de todoList",
      version: "1.0.0",
      description: "Back end en Node.js, database réalisée avec mongoDB",
    },
  },
  apis: ["./routes/*.js"], // Chemin vers vos fichiers de routes
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};
