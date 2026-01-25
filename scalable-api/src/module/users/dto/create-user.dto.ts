import {  IsEmail, IsString, Length, IsNotEmpty} from "class-validator";
import { IsInternationalPhone } from "../../../common/decorators/phone_validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(2, 120)
    name!:string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    @IsInternationalPhone({ message: 'The phone number provided is not a valid mobile number' })
    phone!: string;
}