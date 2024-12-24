export class ClientError extends Error {
  constructor(message: string, public readonly errors: string[]) {
    super(message);
  }
}
