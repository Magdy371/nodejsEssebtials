import { Router } from 'express';
import { UserController } from './users.controller';
import { registery } from "../../config/openapi.registery";
import { z } from "zod";
import { userCreateDto, UserIdParamDto, userUpdateDto } from './dto/users.dto';


const router = Router();
const controller = new UserController();


registery.registerPath({
  method: "post",
  path: "/users",
  tags: ["Users"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: userCreateDto,
        },
      },
    },
  },
  responses: {
    201: {
      description: "User created",
      content: {
        "application/json": {
          schema: z.any(),
        },
      },
    },
  },
});

registery.registerPath({
  method: "get",
  path: "/users",
  tags: ["Users"],
  responses: {
    200: {
      description: "List users",
      content: {
        "application/json": {
          schema: z.array(z.any()),
        },
      },
    },
  },
});

registery.registerPath({
  method: "get",
  path: "/users/{id}",
  tags: ["Users"],
  request: {
    params: UserIdParamDto,
  },
  responses: {
    200: {
      description: "User found",
      content: {
        "application/json": {
          schema: z.any(),
        },
      },
    },
    404: { description: "User not found" },
  },
});

registery.registerPath({
  method: "put",
  path: "/users/{id}",
  tags: ["Users"],
  request: {
    params: UserIdParamDto,
    body: {
      content: {
        "application/json": {
          schema: userUpdateDto,
        },
      },
    },
  },
  responses: {
    200: {
      description: "User updated",
      content: {
        "application/json": {
          schema: z.any(),
        },
      },
    },
    404: { description: "User not found" },
  },
});

registery.registerPath({
  method: "delete",
  path: "/users/{id}",
  tags: ["Users"],
  request: {
    params: UserIdParamDto,
  },
  responses: {
    200: {
      description: "User deleted",
      content: {
        "application/json": {
          schema: z.any(),
        },
      },
    },
    404: { description: "User not found" },
  },
});

// Delete Many endpoint
registery.registerPath({
  method: "delete",
  path: "/users/many",
  tags: ["Users"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            ids: z.array(z.number().int().positive()).min(1),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Users deleted successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            deletedCount: z.number(),
          }),
        },
      },
    },
    400: { description: "Bad request" },
  },
});


router.post("/", controller.create);
router.get("/:id", controller.findOne);
router.get("/", controller.findAll);
router.put("/:id", controller.upadte);
router.delete("/:id", controller.delete);
router.delete("/many", controller.deleteMany);


export default router;