import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Curso } from './curso.model';
import { CursoService } from './curso.service';

@Controller('cursos')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Get()
  async getAllCursos(): Promise<Curso[]> {
    return await this.cursoService.getAllCursos();
  }

  @Get(':id')
  async getCurso(@Param('id') id: string): Promise<Curso | null> {
    try {
      return await this.cursoService.getCurso(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  @Post()
  async createCurso(@Body() cursoData: Omit<Curso, '_id' | 'createdAt'>): Promise<Curso> {
    try {
      return await this.cursoService.createCurso(cursoData);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Put(':id')
  async updateCurso(@Param('id') id: string, @Body() cursoData: Partial<Curso>): Promise<Curso | null> {
    try {
      return await this.cursoService.updateCurso(id, cursoData);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async deleteCurso(@Param('id') id: string): Promise<void> {
    try {
      await this.cursoService.deleteCurso(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
