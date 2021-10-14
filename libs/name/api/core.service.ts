import { Name } from 'libs/database/entities';
import { Injectable } from '@nestjs/common';
import {
  NameService,
  CreateNameInput,
  UpdateNameInput,
} from 'libs/database/name';

import { NamesWithCount } from './classes';

//Core service for the name app.
//In a real app, there could be more than one database object
//being handled here. For the purposes of this test, this is a
//redundant layer.
@Injectable()
export class NamesApiCoreService {
  constructor(private readonly nameService: NameService) {}

  //*************************************************************************************** */
  // Names
  //*************************************************************************************** */

  //Gets all names
  public async getAllNames(): Promise<Name[]> {
    const names = await this.nameService.findAll();
    return names;
  }

  //Gets paginated names based on how many you want per page, (limit)
  //and what index you want to start from (offset)
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

  //gets a name by id
  public async getNameById(id: number): Promise<Name> {
    const name = await this.nameService.findByIdOrFail(id);

    return name;
  }

  //creates a name
  public async createName(data: CreateNameInput): Promise<Name> {
    const name = await this.nameService.createName(data);

    return name;
  }

  //updates a name
  public async updateName(data: UpdateNameInput): Promise<Name> {
    const name = await this.nameService.updateName(data);

    return name;
  }

  //deletes a name, usually I would implement a 'soft-delete'
  //function to archive a name as well, but it seemed overkill here
  public async deleteName(id: number): Promise<Name> {
    const name = await this.nameService.findByIdAndPermanentlyDeleteOrFail(id);

    return name;
  }
}
