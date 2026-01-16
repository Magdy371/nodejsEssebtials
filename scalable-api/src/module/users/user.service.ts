import { database } from '../../common/db';
import { CreateUserDto} from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { users } from '../../common/db/schema'
import {or, eq} from "drizzle-orm";

export class UserService {
    async create(dto: CreateUserDto){
        // check for existing email
        const existing_fields = await database.select({
            email: users.email,
            phone: users.phone,
        }).from(users).where(
            or(
                eq(users.email, dto.email),
                eq(users.phone, dto.phone),
            )
        ).limit(1);
        if(existing_fields){
            if (existing_fields[0].phone){
                throw new Error(`User with same phone already exists`);
            }else if(existing_fields[0].email){
                throw new Error(`User with same email already exists`);
            }
        }
        const createdUser = await database.insert(users).values(dto).returning();
        return createdUser;
    }

    async findOne(id: string){
        const [user] = await database.select().from(users).where(eq(users.id, id));
        if (!user){
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }
    async findAll()
    {
        return await database.select().from(users);
    }

    async update(id: string, dto: UpdateUserDto){
        await this.findOne(id);
        const updatedUser = await database.update(users).set({...dto, updatedAt: new Date()});
        return updatedUser;
    }

    async delete(id: string){
        await this.findOne(id);
        const deletedUser = await database.delete(users).where(eq(users.id, id));
        return deletedUser;
    }
}