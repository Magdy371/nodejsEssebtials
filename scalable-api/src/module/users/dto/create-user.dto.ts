import {  IsEmail, IsString, Length, IsNotEmpty} from "class-validator";

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
    phone!: string;
}