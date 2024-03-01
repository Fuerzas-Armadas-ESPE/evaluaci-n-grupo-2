import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Tema } from './tema.model';
import { TemaService } from './tema.service';

@Controller('temas')
export class TemaController {
  constructor(private readonly temaService: TemaService) {}

  @Get()
  async getAllTemas(): Promise<Tema[]> {
    return await this.temaService.getAllTemas();
  }

  @Get(':id')
  async getTema(@Param('id') id: string): Promise<Tema | null> {
    try {
      return await this.temaService.getTema(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  @Post()
  async createTema(@Body() temaData: Omit<Tema, '_id' | 'createdAt'>): Promise<Tema> {
    try {
      return await this.temaService.createTema(temaData);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Put(':id')
  async updateTema(@Param('id') id: string, @Body() temaData: Partial<Tema>): Promise<Tema | null> {
    try {
      return await this.temaService.updateTema(id, temaData);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async deleteTema(@Param('id') id: string): Promise<void> {
    try {
      await this.temaService.deleteTema(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
