import { ZodError } from 'zod';
import { HttpError, ValidationError, NotFoundError } from '../utils/errors.js';

export default function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  // Custom HttpError
  if (err instanceof HttpError) {
    const payload = { error: err.message };
    if (err instanceof ValidationError && err.details) payload.details = err.details;
    return res.status(err.status).json(payload);
  }

  // Zod validation errors (if used elsewhere)
  if (err instanceof ZodError) {
    const details = err.errors.map(e => ({ path: e.path.join('.'), message: e.message }));
    return res.status(400).json({ error: 'Validation failed', details });
  }

  // Fallback
  console.error(err);
  return res.status(500).json({ error: 'Internal Server Error' });
}
