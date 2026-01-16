import { Router } from 'express';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto} from "./dto/create-user.dto";
import { UpdateUserDto} from "./dto/update-user.dto";
import { validateBody } from "../../common/middleware/validate.middleware";
import { asyncHandler } from "../../common/utils/async-handler";

export const userRouter = Router();
const service = new UserService();
const controller = new UserController(service);


/**
 * @openapi
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: List all users
 *     responses:
 *       200:
 *         description: OK
 */
userRouter.get('/', asyncHandler(controller.findAll));

/**
*@openapi
* /users/{id}:
*   get:
    *     tags: [Users]
*     summary: Get user by id
*     parameters:
*       - in: path
*         name: id
*         schema: { type: string }
*         required: true
*     responses:
*       200: { description: OK }
*       404: { description: Not Found }
*/
userRouter.get('/:id', asyncHandler(controller.findOne));


/**
 * @openapi
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Create user
 *     requestBody:
 *       required: true
 *       content:
 *
 * application/json:
 *           schema:
 *               type: object
 *               required: [name, email]
 *             properties:
 *               name: { type: string, example: "Mohamed" }
 *               email: { type: string, example: "mohamed@example.com" }
 *     responses:
 *       201: { description: Created }
 */
userRouter.post('/', validateBody(CreateUserDto), asyncHandler(controller.create));


/**
 * @openapi
 * /users/{id}:
 *   patch:
 *     tags: [Users]
 *     summary: Update user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not Found }
 */
userRouter.patch('/:id', validateBody(UpdateUserDto), asyncHandler(controller.update));


/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *     responses:
 *       204: { description: No Content }
 *       404: { description: Not Found }
 */
userRouter.delete('/:id', asyncHandler(controller.delete));
