import { Entity, Property } from '@mikro-orm/core';

import { BaseEntity } from '../_base.entity';

@Entity({
  tableName: 'name',
})
export class Name extends BaseEntity {
  @Property()
  public name: string;
}
