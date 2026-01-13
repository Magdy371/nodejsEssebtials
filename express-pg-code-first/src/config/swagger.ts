import swaggerUi from "swagger-ui-express";
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registery } from "./openapi.registery";

export const setupSwagger = (app: any) => {
  const generator = new OpenApiGeneratorV3(registery.definitions);

  const document = generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "Express Zod API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  });

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(document));
};
