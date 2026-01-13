import { eq, inArray, not } from "drizzle-orm";
import { db } from "../../common/database/db.service";
import { users } from '../../common/database/schema';
import { CreateUserDtoType, UpdateUserDtoType } from "./dto/users.dto";
import { parsePhoneNumber } from 'libphonenumber-js';



export class UsersService {
    async create(data: CreateUserDtoType) {
        // Normalize phone to E.164 format
        const phoneNumber = parsePhoneNumber(data.phone);
        const normalizedData = {
            ...data,
            phone: phoneNumber.format('E.164'), // Always store as +966501234567
        };
        const user = await db.insert(users).values(normalizedData).returning();
        return user;
    }

    async findOne(id: number){
        const foundUser = await db.select().from(users).where(eq(users.id, id));
        return foundUser;
    }

    async findAll(){
        return await db.select().from(users);
    }

    async update(id: number, data: UpdateUserDtoType) {
        const existingUser = await this.findOne(id);
        if(!existingUser){
            throw new Error('User not found');
        }
        const normalizedData = data.phone ?{
            ...data, 
                phone: parsePhoneNumber(data.phone).format('E.164'),
                updatedAt: new Date()
        }:{ ...data, updatedAt: new Date() };
        const [updated] = await db.update(users).set(normalizedData).where(eq(users.id, id)).returning();
        return updated;
    }

    async remove(id:number): Promise<{message:string}>{
        const existingUser = await this.findOne(id);
        if(!existingUser){
            throw new Error('User Not Found');
        }
        const [deletedUser] = await db.delete(users).where(eq(users.id, id)).returning();
        return {message: `user ${deletedUser.fullName} deleted successfully`};
    }

    async deleteMany(ids: number[]):Promise<{message: string}>{
        const length = ids.length;
        await db.delete(users).where(inArray(users.id,ids));
        return {message: `user affected are ${length}`};
    }
}