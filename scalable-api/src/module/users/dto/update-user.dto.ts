
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { IsInternationalPhone } from '../../../common/decorators/phone_validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @Length(2, 120)
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @IsInternationalPhone({ message: 'The phone number provided is not a valid mobile number' })
    phone?: string;
}
