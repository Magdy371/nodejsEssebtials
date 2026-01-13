import { Request, Response } from 'express';
import { UsersService } from './users.service';
import {
    userUpdateDto,
    userCreateDto,
    UserIdParamDto
} from './dto/users.dto'

const service = new UsersService();

export class UserController {
    async create(req: Request, res: Response) {
        try {
            const data = userCreateDto.parse(req.body);
            const user = await service.create(data);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async findOne(req: Request, res: Response) {
        const { id } = UserIdParamDto.parse(req.params);
        const user = await service.findOne(id);
        res.status(200).json(user);
    }

    async findAll(req: Request, res: Response) {
        const users = await service.findAll();
        res.status(200).json(users);
    }

    async upadte(req: Request, res: Response) {
        const { id } = UserIdParamDto.parse(req.params);
        const data = userUpdateDto.parse(req.body);
        const upadtedUser = await service.update(id, data);
        res.status(201).json(upadtedUser);
    }

    async delete(req: Request, res: Response) {
        const { id } = UserIdParamDto.parse(req.params);
        const deletedUser = await service.remove(id);
        res.status(200).json(deletedUser).send();
    }

    async deleteMany(req: Request, res: Response) {
        const ids: number[] = req.body.ids;
        const result = await service.deleteMany(ids);
        res.status(200).json(result).send();
    }
}