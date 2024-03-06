import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Curso } from './curso.model';

@Injectable()
export class CursoService {
  constructor(
    @InjectModel('Curso') private readonly cursoModel: Model<Curso>,
  ) {}

  async getAllCursos(): Promise<Curso[]> {
    return await this.cursoModel.find().exec();
  }

  async getCurso(id: string): Promise<Curso | null> {
    try {
      const curso = await this.cursoModel.findById(id).exec();
      if (!curso) {
        throw new NotFoundException('Curso no encontrado');
      }
      return curso;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async createCurso(
    cursoData: Omit<Curso, '_id' | 'createdAt'>,
  ): Promise<Curso> {
    try {
      const createdCurso = new this.cursoModel(cursoData);
      return await createdCurso.save();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateCurso(
    id: string,
    cursoData: Partial<Curso>,
  ): Promise<Curso | null> {
    try {
      const existingCurso = await this.cursoModel.findById(id).exec();
      if (!existingCurso) {
        throw new NotFoundException('Curso no encontrado');
      }
      existingCurso.set(cursoData);
      return await existingCurso.save();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteCurso(id: string): Promise<void> {
    try {
      await this.cursoModel.findByIdAndDelete(id).exec();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
