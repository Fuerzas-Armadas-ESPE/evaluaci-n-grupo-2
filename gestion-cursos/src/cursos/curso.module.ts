import { Module } from '@nestjs/common';
import { CursoController } from './curso.controller';
import { CursoService } from './curso.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CursoSchema } from './curso.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Curso', schema: CursoSchema }])],
  controllers: [CursoController],
  providers: [CursoService],
})
export class CursoModule {}
