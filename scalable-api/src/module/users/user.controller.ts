import { UserService } from "./user.service";
import type { Request, Response  } from "express";

export class UserController {
    constructor(private userService: UserService) {}
    create  = async (req: Request, res: Response) => {
        const user = await this.userService.create(req.body);
        res.status(201).json(user);
    }

    findOne = async (req: Request, res: Response) => {
        const id = String(req.params);
        const foundUser = await this.userService.findOne(id);
    }

    findAll = async (req: Request, res: Response) => {
        const users = await this.userService.findAll();
        res.status(200).json(users);
    }

    update = async (req: Request, res: Response) => {
        const id = String(req.params);
        const user = await this.userService.update(id, req.body);
        res.status(200).json(user);
    }
    delete = async (req: Request, res: Response) => {
        const id = String(req.params);
        const user = await this.userService.delete(id);
        res.status(200).json(user);
    }
}