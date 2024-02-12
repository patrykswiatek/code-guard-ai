export const logAndRethrowError = (potentialError: unknown): never => {
  if (potentialError instanceof Error) {
    console.error('An error occurred:', potentialError.message);
    throw potentialError;
  }

  throw new Error('An unexpected error has occurred.');
};
