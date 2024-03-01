import { Module } from '@nestjs/common';
import { TemaController } from './tema.controller';
import { TemaService } from './tema.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TemaSchema } from './tema.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Tema', schema: TemaSchema }])],
  controllers: [TemaController],
  providers: [TemaService],
})
export class TemaModule {}
    