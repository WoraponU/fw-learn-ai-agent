import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

export const processError = (errors: z.ZodIssue[]) => {
  // Use 'any' for flexibility in nested structure, following custom instructions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processedErrors: Record<string, any> = {}

  for (const error of errors) {
    const path = error.path
    const errorMessage = error.message

    if (path.length === 0) continue // Ignore errors with empty paths

    let currentLevel = processedErrors
    // Traverse path to create nested structure, stopping before the last element
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i]

      // Ensure key is a valid index type (string or number)
      if (typeof key !== 'string' && typeof key !== 'number') {
        console.warn(`Schema validation: Skipping invalid path segment: ${key}`)
        continue // Skip this segment if it's not a valid key
      }

      if (currentLevel[key] === undefined || currentLevel[key] === null) {
        // Initialize as object if path doesn't exist
        currentLevel[key] = {}
      } else if (
        typeof currentLevel[key] !== 'object' ||
        Array.isArray(currentLevel[key])
      ) {
        // Handle conflict: path points to a non-object (e.g., an existing error array)
        // Overwrite with an object to allow deeper nesting, logging a warning.
        // This might happen with conflicting paths like ['a'] and ['a', 'b'].
        console.warn(
          `Schema validation: Overwriting existing non-object value at path key '${key}' to create nested structure.`,
        )
        currentLevel[key] = {}
      }
      currentLevel = currentLevel[key]
    }

    // Handle the final key (the field where the error occurs)
    const finalKey = path[path.length - 1]

    // Ensure finalKey is a valid index type (string or number)
    if (typeof finalKey !== 'string' && typeof finalKey !== 'number') {
      console.warn(
        `Schema validation: Skipping invalid final path segment: ${finalKey}`,
      )
      continue // Skip this error if the final key is invalid
    }

    if (
      currentLevel[finalKey] === undefined ||
      currentLevel[finalKey] === null
    ) {
      // If no errors exist for this path yet, initialize with the current error message
      currentLevel[finalKey] = [errorMessage]
    } else if (Array.isArray(currentLevel[finalKey])) {
      // If errors already exist (as an array), push the new message
      currentLevel[finalKey].push(errorMessage)
    } else {
      // Handle conflict: path points to an existing object where an error message should be
      // Overwrite the object with the error message array, logging a warning.
      // This might happen with conflicting paths like ['a', 'b'] and ['a', 'b', 'c'].
      console.warn(
        `Schema validation: Overwriting existing object at path key '${finalKey}' with error messages.`,
      )
      currentLevel[finalKey] = [errorMessage]
    }
  }

  return processedErrors
}

export const schemaValidator = <T extends z.ZodType>(schema: T) => {
  return zValidator('json', schema, (result, c) => {
    if (!result.success) {
      const processedErrors = processError(result.error.errors)

      return c.json(
        {
          error: {
            code: 'SCHEMA_VALIDATION_ERROR',
            detail: processedErrors,
          },
        },
        400,
      )
    }
  })
}

export const querySchemaValidator = <T extends z.ZodType>(schema: T) => {
  return zValidator('query', schema, (result, c) => {
    if (!result.success) {
      const processedErrors = processError(result.error.errors)

      return c.json(
        {
          error: {
            code: 'SCHEMA_VALIDATION_ERROR',
            detail: processedErrors,
          },
        },
        400,
      )
    }
  })
}
