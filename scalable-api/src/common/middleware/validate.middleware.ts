import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import type {RequestHandler} from "express";

export function validateBody < T extends Object >(DtoClass: new() => T): RequestHandler{
    return async (req, res, next) => {
        const dto = plainToInstance(DtoClass, req.body);
        const errors = await validate(dto,{
            whitelist: true,
            forbidNonWhitelisted: true
        });
        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Validation Failed',
                errors: errors.map(e => ({
                    property: e.property,
                    constraints: e.constraints
                }))
            });
        }
        req.body = dto;
        next();
    };
}