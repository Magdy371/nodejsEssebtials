import { z } from 'zod';
import { registery } from "../../../config/openapi.registery";
import { isValidPhoneNumber } from 'libphonenumber-js';

//Phone Number validator
const phoneValidator = z.string().refine(
    (phone) => {
        try {
            return isValidPhoneNumber(phone);
        } catch {
            return false;
        }
    },
    {
        message: 'Invalid phone number. Must be in international format (e.g., +966501234567, +201001234567)'
    }
)

export const userCreateDto = z.object({
    email: z.string().email(),
    fullName: z.string().min(3),
    phone: phoneValidator,
    timezone: z.string().default('Africa/Cairo'),
    country: z.string().min(3),
});

export const userUpdateDto = z.object({
    email: z.string().email().optional(),
    fullName: z.string().min(3).optional(),
    phone: z.string().min(3).optional(),
    timezone: z.string().default('Africa/Cairo').optional(),
    country: z.string().min(3).optional(),
});

export const UserIdParamDto = z.object({
    id: z.coerce.number().int().positive(),
});

registery.register("CreateUser", userCreateDto);
registery.register("UpdateUser", userUpdateDto);
registery.register("UserIdParam", UserIdParamDto);

export type CreateUserDtoType = z.infer<typeof userCreateDto>;
export type UpdateUserDtoType = z.infer<typeof userUpdateDto>;