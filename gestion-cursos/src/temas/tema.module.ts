import { Module } from '@nestjs/common';
import { TemaController } from './tema.controller';
import { TemaService } from './tema.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TemaSchema } from './tema.model';
import { CursoSchema } from '../cursos/curso.model'; // Importa el módulo de curso

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Tema', schema: TemaSchema },
      { name: 'Curso', schema: CursoSchema },
    ]),
  ],
  controllers: [TemaController],
  providers: [TemaService],
})
export class TemaModule {}
