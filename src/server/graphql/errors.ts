// https://escape.tech/blog/graphql-errors-the-good-the-bad-and-the-ugly/
// https://the-guild.dev/graphql/yoga-server/tutorial/basic/09-error-handling#recap-of-the-encountered-error
// https://blog.logrocket.com/handling-graphql-errors-like-a-champ-with-unions-and-interfaces/
// If you make these GraphqlError they will be skipped by yoga mapped errors

export class NotAuthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NOT_AUTHORIZED';
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NOT_FOUND';
  }
}
