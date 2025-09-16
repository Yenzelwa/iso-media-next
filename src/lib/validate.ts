import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export function validate(schema: object, data: unknown): void {
  const valid = ajv.validate(schema, data);
  if (!valid) {
    const errors = ajv.errors?.reduce((acc, err) => {
      const field = err.instancePath.slice(1) || err.params?.missingProperty;
      if (field) {
        acc[field] = err.message || 'Invalid value';
      }
      return acc;
    }, {} as Record<string, string>) || {};
    
    throw new ValidationError('Validation failed', errors);
  }
}

export class ValidationError extends Error {
  constructor(public message: string, public details: Record<string, string>) {
    super(message);
    this.name = 'ValidationError';
  }
}