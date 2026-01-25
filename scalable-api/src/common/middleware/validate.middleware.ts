import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import type { RequestHandler } from "express";

// Helper function to format validation errors
function formatValidationErrors(errors: ValidationError[]): any[] {
    return errors.map(error => {
        const constraints: Record<string, string> = {};
        
        if (error.constraints) {
            Object.keys(error.constraints).forEach(key => {
                constraints[key] = error.constraints![key];
            });
        }
        
        return {
            property: error.property,
            value: error.value,
            constraints: constraints
        };
    });
}

export function validateBody<T extends Object>(DtoClass: new () => T): RequestHandler {
    return async (req, res, next) => {
        try {
            // Transform plain object to class instance
            const dto = plainToInstance(DtoClass, req.body);
            
            // Validate with strict options
            const errors = await validate(dto, {
                whitelist: true,           // Strip properties that don't have decorators
                forbidNonWhitelisted: true, // Throw error if non-whitelisted properties exist
                skipMissingProperties: false, // Don't skip validation of missing properties
                validationError: {
                    target: false,          // Don't include target in error
                    value: true             // Include value in error
                }
            });
            
            if (errors.length > 0) {
                return res.status(422).json({
                    message: 'Validation Failed',
                    errors: formatValidationErrors(errors)
                });
            }
            
            // Replace req.body with validated DTO instance
            req.body = dto;
            next();
        } catch (error) {
            return res.status(500).json({
                message: 'Validation Error',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}