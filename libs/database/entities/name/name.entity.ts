import { Entity, Property } from '@mikro-orm/core';

import { BaseEntity } from '../_base.entity';

//Creates a mikro-orm entity with the base_entity
//properties as well as the properties assigned here,
//in this case we are creating a name entity with a single
//'name' property
@Entity({
  tableName: 'name',
})
export class Name extends BaseEntity {
  @Property()
  public name: string;
}
