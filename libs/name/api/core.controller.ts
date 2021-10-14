import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Name } from 'libs/database/entities';
import { CreateNameInput, UpdateNameInput } from 'libs/database/name';
import { NamesWithCount } from './classes';

import { NamesApiCoreService } from './core.service';

//Namespaced controller in case of api version change in the future.
@Controller('api/v1')
export class NamesApiCoreController {
  constructor(private readonly coreService: NamesApiCoreService) {}

  //Route to get all names, probably wouldn't be used in production
  @Get('names')
  public async test(): Promise<Name[]> {
    const names = this.coreService.getAllNames();
    return names;
  }

  //Route to get paginated names, would be used in production
  @Post('names')
  public async getPaginatedNames(
    @Body() data: { limit: number; offset: number },
  ): Promise<NamesWithCount> {
    const namesWithCount = this.coreService.getPaginatedNames(
      data.limit,
      data.offset,
    );
    return namesWithCount;
  }

  //Route to get a specific name by id
  //in production I would use a slug rather than an id
  @Get('names/:id')
  public async getNameById(@Param('id') id: number): Promise<Name> {
    const name = this.coreService.getNameById(id);
    return name;
  }

  //Post route to create a new name
  @Post('names/new')
  public async createName(@Body() data: CreateNameInput): Promise<Name> {
    try {
      const name = await this.coreService.createName(data);

      return name;
    } catch (error) {
      throw Error(error);
    }
  }

  //Post route to edit a name.
  //The asterisk in the route is unimportant for the purpose
  //of this function, but sets a standard for the front end devs to work with
  @Post('names/*/edit')
  public async updateName(@Body() data: UpdateNameInput): Promise<Name> {
    try {
      const name = await this.coreService.updateName(data);

      return name;
    } catch (error) {
      throw Error(error);
    }
  }

  //Post route to delete a name
  @Post('names/:id')
  public async deleteName(@Param('id') id: number): Promise<Name> {
    const name = this.coreService.deleteName(id);
    return name;
  }
}
