export const handleError = (error: unknown): Error => {
  if (error instanceof Error) {
    console.error('Error sending code to OpenAI:', error.message);
    throw error;
  }

  throw new Error('Something went wrong.');
}
