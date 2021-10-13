import { Name } from 'libs/database/entities';
import { Injectable } from '@nestjs/common';
import {
  NameService,
  CreateNameInput,
  UpdateNameInput,
} from 'libs/database/name';

import { NamesWithCount } from './classes';

@Injectable()
export class NamesApiCoreService {
  constructor(private readonly nameService: NameService) {}

  //*************************************************************************************** */
  // Names
  //*************************************************************************************** */

  public async getPaginatedNames(
    limit: number,
    offset: number,
  ): Promise<NamesWithCount> {
    const [names, countOfNames] = await this.nameService.findAndCount(
      {},
      { limit: limit, offset: offset },
    );
    const namesWithCount = {
      names: names,
      count: countOfNames,
    };
    return namesWithCount;
  }

  public async getNameById(id: number): Promise<Name> {
    const name = await this.nameService.findByIdOrFail(id);

    return name;
  }

  public async createName(data: CreateNameInput): Promise<Name> {
    const name = await this.nameService.createName(data);

    return name;
  }

  public async updateName(data: UpdateNameInput): Promise<Name> {
    const name = await this.nameService.updateName(data);

    return name;
  }

  public async deleteName(id: number): Promise<Name> {
    const name = await this.nameService.findByIdAndPermanentlyDeleteOrFail(id);

    return name;
  }
}
