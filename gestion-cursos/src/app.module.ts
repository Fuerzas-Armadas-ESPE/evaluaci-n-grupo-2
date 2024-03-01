
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CursoModule } from './cursos/curso.module';
import { TemaModule } from './temas/tema.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:grupo2@localhost:27037/'),
    CursoModule,
    TemaModule
  ],

})
export class AppModule {}
