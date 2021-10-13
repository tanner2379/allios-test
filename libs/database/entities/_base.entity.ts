import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

/**
 * The `BaseEntity` defines metadata properties common to all entities in the database.
 */

@Entity({
  abstract: true,
})
export class BaseEntity {
  /**
   * A unique serialized ID for an entity.
   */
  @PrimaryKey()
  public id: number;

  /**
   * The time at which the entity was created.
   */
  @Property({
    onCreate: () => new Date(),
  })
  public createdAt: Date;

  /**
   * The time at which the entity was most recently updated.
   */
  @Property({
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
  })
  public updatedAt: Date;

  /**
   * The time at which the entity was "soft-deleted".
   */

  @Property({
    nullable: true,
  })
  public archivedAt?: Date = null;
}
