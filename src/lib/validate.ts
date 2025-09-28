// lib/validate.ts
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

// Import ALL schemas that are referenced by $ref anywhere
import VideoSchema from '@/schemas/catalog/Video.schema.json';
import SeriesSchema from '@/schemas/series/Series.schema.json'; // <-- add this (and any others you reference)

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Register helper: only add if not already present
function ensureSchema(schema: any) {
  const id = schema?.$id;
  if (!id) return;
  if (!ajv.getSchema(id)) ajv.addSchema(schema, id);
}

// Preload $ref targets here (expand as needed)
ensureSchema(VideoSchema);
ensureSchema(SeriesSchema);

export class ValidationError extends Error {
  constructor(public message: string, public details: Record<string, string>) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validate(schema: object, data: unknown): void {
  const valid = ajv.validate(schema, data);
  if (!valid) {
    const errors =
      ajv.errors?.reduce((acc, err) => {
        const field = err.instancePath.slice(1) || (err.params as any)?.missingProperty;
        if (field) acc[field] = err.message || 'Invalid value';
        return acc;
      }, {} as Record<string, string>) ?? {};
    throw new ValidationError('Validation failed', errors);
  }
}
