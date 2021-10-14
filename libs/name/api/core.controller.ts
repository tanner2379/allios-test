import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Name } from 'libs/database/entities';
import { CreateNameInput, UpdateNameInput } from 'libs/database/name';
import { NamesWithCount } from './classes';

import { NamesApiCoreService } from './core.service';

@Controller('api/v1')
export class NamesApiCoreController {
  constructor(private readonly coreService: NamesApiCoreService) {}

  @Get('names')
  public async test(): Promise<Name[]> {
    const names = this.coreService.getAllNames();
    return names;
  }

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

  @Get('names/:id')
  public async getNameById(@Param('id') id: number): Promise<Name> {
    const name = this.coreService.getNameById(id);
    return name;
  }

  @Post('names/new')
  public async createName(@Body() data: CreateNameInput): Promise<Name> {
    try {
      const name = await this.coreService.createName(data);

      return name;
    } catch (error) {
      throw Error(error);
    }
  }

  @Post('names/*/edit')
  public async updateName(@Body() data: UpdateNameInput): Promise<Name> {
    try {
      const name = await this.coreService.updateName(data);

      return name;
    } catch (error) {
      throw Error(error);
    }
  }

  @Post('names/:id')
  public async deleteName(@Param('id') id: number): Promise<Name> {
    const name = this.coreService.deleteName(id);
    return name;
  }
}
