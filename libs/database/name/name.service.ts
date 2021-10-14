import { BaseEntityService } from 'libs/database/common';
import { Name } from 'libs/database/entities';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { CreateNameInput, UpdateNameInput } from './dto';

//Service to create and edit names
@Injectable()
export class NameService extends BaseEntityService<
  Name,
  EntityRepository<Name>
> {
  constructor(
    @InjectRepository(Name)
    protected readonly nameRepository: EntityRepository<Name>,
  ) {
    super(nameRepository);
  }

  protected defaultPopulate = [];

  //Creates a name and persists it to the database
  public async createName(data: CreateNameInput): Promise<Name> {
    const newName = this.entityRepository.create(data);

    await this.entityRepository.persistAndFlush(newName);

    return newName;
  }

  //Updates a name and persists it to the database
  public async updateName(data: UpdateNameInput): Promise<Name> {
    const { nameId, ...rest } = data;
    const name = await this.findByIdOrFail(nameId);

    //Updates all keys that the user wants changed.
    //This is entirely overkill for a one property object
    //but I am showing my usual method here.
    for (const [key, value] of Object.entries(rest)) {
      if (value) {
        name[key] = value;
      }
    }

    await this.entityRepository.persistAndFlush(name);

    return name;
  }
}
