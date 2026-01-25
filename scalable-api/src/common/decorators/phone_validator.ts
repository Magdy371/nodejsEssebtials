import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';
// Import parsePhoneNumberFromString for stricter control
import { parsePhoneNumberFromString } from 'libphonenumber-js'; 

export function IsInternationalPhone(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isInternationalPhone',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    if (typeof value !== 'string') return false;

                    // 1. Ensure it starts with '+'
                    if (!value.startsWith('+')) return false;

                    try {
                        const phoneNumber = parsePhoneNumberFromString(value);
                        
                        // 2. .isValid() is much stricter than the general check.
                        // It checks the number against metadata for that specific country.
                        // It will return false for "+20101199908890" due to length.
                        return phoneNumber ? phoneNumber.isValid() : false;
                    } catch (error) {
                        return false;
                    }
                },
                defaultMessage() {
                    return 'Invalid phone number. Please provide a valid international format (e.g., +201012345678)';
                },
            },
        });
    };
}