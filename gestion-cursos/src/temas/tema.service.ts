import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tema } from './tema.model';
import { Curso } from '../cursos/curso.model'; // Asegúrate de importar el modelo del curso

@Injectable()
export class TemaService {
  constructor(
    @InjectModel('Tema') private readonly temaModel: Model<Tema>,
    @InjectModel('Curso') private readonly cursoModel: Model<Curso>, // Inyecta el modelo de curso
  ) {}

  async getAllTemas(): Promise<Tema[]> {
    return await this.temaModel.find().exec();
  }

  async getTema(id: string): Promise<Tema | null> {
    try {
      const tema = await this.temaModel.findById(id).exec();
      if (!tema) {
        throw new NotFoundException('Tema no encontrado');
      }
      return tema;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async createTema(temaData: Omit<Tema, '_id' | 'createdAt'>): Promise<Tema> {
    try {
      const createdTema = new this.temaModel(temaData);
      return await createdTema.save();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateTema(id: string, temaData: Partial<Tema>): Promise<Tema | null> {
    try {
      const existingTema = await this.temaModel.findById(id).exec();
      if (!existingTema) {
        throw new NotFoundException('Tema no encontrado');
      }
      existingTema.set(temaData);
      return await existingTema.save();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteTema(id: string): Promise<void> {
    try {
      // Encuentra el tema que se va a eliminar
      const tema = await this.temaModel.findById(id).exec();
      if (!tema) {
        throw new NotFoundException('Tema no encontrado');
      }

      // Actualiza los cursos que contienen el tema eliminado
      await this.cursoModel
        .updateMany(
          { temas: id },
          { $pull: { temas: id } }, // Elimina la referencia al tema
        )
        .exec();

      // Elimina el tema
      await this.temaModel.findByIdAndDelete(id).exec();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
