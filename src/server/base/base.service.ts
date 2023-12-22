import Logger from '@/lib/logging/log-util';
import { NotFoundError, OptimisticLockError } from '@/server/graphql/errors';
import { type MyContextType } from '@/server/graphql/server';
import { sortAndPagination, type TableInput } from '@/server/graphql/sortAndPagination';
import { accessCheck } from '@/server/utils/accessCheck';
import { type SubjectType } from '@/server/utils/caslAbility';
import { type IRepository, type Page } from '@enalmada/drizzle-helpers';

export interface ListInput<TEntity> extends TableInput {
  where?: Partial<TEntity>;
}

export interface BaseEntity {
  id: string;
  // createdBy?: string | null;
  createdAt: Date;
  // updatedBy?: string | null;
  updatedAt: Date;
  version: number;
}

export default abstract class BaseService<
  TEntity extends BaseEntity,
  TInput extends Partial<BaseEntity>,
  TRepository extends IRepository<TEntity, TInput>,
> {
  protected readonly logger: Logger;

  protected constructor(
    private entityName: SubjectType,
    private repository: TRepository
  ) {
    this.logger = new Logger(`${entityName}Service`);
  }

  async get(id: string, ctx: MyContextType) {
    const logger = this.logger.logMethodStart(`${this.entityName} ${this.get.name}`, ctx);

    const entity = await this.repository.findFirst({ id } as Partial<TEntity>);

    if (!entity) {
      throw new NotFoundError(`${this.entityName} ${id} not found`, logger);
    }

    accessCheck(logger, ctx.currentUser, 'read', this.entityName, entity);

    return entity;
  }

  async list(input: ListInput<TEntity> | undefined, ctx: MyContextType): Promise<Page<TEntity>> {
    const logger = this.logger.logMethodStart(`${this.entityName} ${this.list.name}`, ctx, {
      ...input,
    });

    accessCheck(logger, ctx.currentUser, 'list', this.entityName, input?.where);

    const { order, paging } = sortAndPagination(input);

    return this.repository.findPage({ criteria: input?.where, order, paging });
  }

  async create(input: TInput, ctx: MyContextType): Promise<TEntity> {
    const logger = this.logger.logMethodStart(`${this.entityName} ${this.create.name}`, ctx, {
      data: { ...input },
    });

    const createWith = {
      ...input,
      createdAt: new Date(),
      // createdBy: ctx.currentUser?.id,
      updatedAt: new Date(),
      // updatedBy: ctx.currentUser!.id,
      version: 1,
    };

    accessCheck(logger, ctx.currentUser, 'create', this.entityName, createWith);

    return this.repository.create(createWith);
  }

  async update(id: string, input: TInput, ctx: MyContextType): Promise<TEntity> {
    const logger = this.logger.logMethodStart(`${this.entityName} ${this.update.name}`, ctx, {
      data: { id, ...input },
    });

    const entity = await this.repository.findFirst({ id } as Partial<TEntity>);

    if (!entity) {
      throw new NotFoundError(`${this.entityName} ${id} not found`, logger);
    }

    if (entity.version !== input.version) {
      // TODO notify user that entity has changed in another tab, device, or session.
      throw new OptimisticLockError(
        `${this.entityName} has changed since loading.  Please reload and try again.`,
        logger
      );
    }

    accessCheck(logger, ctx.currentUser, 'update', this.entityName, entity);

    const updateWith = {
      ...input,
      updatedAt: new Date(),
      // updatedBy: ctx.currentUser?.id,
      version: entity.version + 1,
    };

    return this.repository.update(id, updateWith);
  }

  async delete(id: string, ctx: MyContextType): Promise<TEntity> {
    const logger = this.logger.logMethodStart(`${this.entityName} ${this.delete.name}`, ctx, {
      id,
    });

    const entity = await this.repository.findFirst({ id } as Partial<TEntity>);

    if (!entity) {
      throw new NotFoundError(`${this.entityName} ${id} not found`, logger);
    }

    accessCheck(logger, ctx.currentUser, 'delete', this.entityName, entity);

    return this.repository.delete(id);
  }
}
