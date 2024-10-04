import { Application } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: "API documentation for the User management system",
    },
    servers: [
      {
        url: "http://localhost:5000", // Update with your server URL
      },
    ],
  },
  apis: ["./src/modules/*/*.routes.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
