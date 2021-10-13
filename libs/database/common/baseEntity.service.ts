import { BaseEntity } from '../entities/_base.entity';
import {
  EntityRepository,
  FilterQuery,
  FindOptions,
  QueryOrder,
  QueryOrderMap,
} from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

/**
 * The abstract base which defines methods common to all database entity services.
 */
@Injectable()
export abstract class BaseEntityService<
  TEntity extends BaseEntity,
  TEntityRepository extends EntityRepository<TEntity>,
> {
  constructor(protected readonly entityRepository: TEntityRepository) {}

  /**
   * The default properties to populate on a query to the database.
   */
  protected abstract defaultPopulate: string[];

  /**
   * The default sorting order for entities returned from the database.
   */
  protected defaultOrderBy: QueryOrderMap = {
    id: QueryOrder.DESC,
  };

  /**
   * Directly accesses the entity repository to allow for highly specific access.
   */
  public getRepository(): TEntityRepository {
    return this.entityRepository;
  }

  /**
   * Finds a single entity using a provided set of options.
   */
  public async findOneOrFail(
    options: FilterQuery<TEntity>,
    populate: string[] = this.defaultPopulate,
    orderBy: QueryOrderMap = this.defaultOrderBy,
  ): Promise<TEntity> {
    const entity = await this.entityRepository.findOneOrFail(
      options,
      populate,
      orderBy,
    );

    return entity;
  }

  /**
   * Finds a specific entity by its ID.
   */
  public async findByIdOrFail(
    id: number | string,
    populate: string[] = this.defaultPopulate,
    orderBy: QueryOrderMap = this.defaultOrderBy,
  ): Promise<TEntity> {
    // The `where` contstraint must be cast as `any` to avoid a type mismatch
    const entity = await this.entityRepository.findOneOrFail(
      { id } as any,
      populate,
      orderBy,
    );

    return entity;
  }

  /**
   * Finds all entities matching a given query.
   */
  public async findMany(
    where: FilterQuery<TEntity>,
    populate: string[] = this.defaultPopulate,
    orderBy: QueryOrderMap = this.defaultOrderBy,
  ): Promise<TEntity[]> {
    const entities = await this.entityRepository.find(where, {
      populate,
      orderBy,
    });

    return entities;
  }

  /**
   * Finds all of the requested entity.
   */
  public async findAll(options?: FindOptions<TEntity>): Promise<TEntity[]> {
    const entities = await this.entityRepository.findAll(options);

    return entities;
  }

  /**
   * Finds and paginates entities.
   */
  public async findAndCount(
    entity: FilterQuery<TEntity>,
    options: FindOptions<TEntity>,
  ): Promise<[TEntity[], number]> {
    const [entities, count] = await this.entityRepository.findAndCount(
      entity,
      options,
    );

    return [entities, count];
  }

  /**
   * Permanently deletes an entity from the database.
   */
  public async findByIdAndPermanentlyDeleteOrFail(
    id: number,
  ): Promise<TEntity> {
    const entity = await this.findByIdOrFail(id);

    await this.entityRepository.removeAndFlush(entity);

    return entity;
  }
}
