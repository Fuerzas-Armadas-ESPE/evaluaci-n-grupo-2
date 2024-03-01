// curso.model.ts
import { Schema, Document, Types } from 'mongoose';

export interface Curso extends Document {
  titulo: string;
  createdAt: Date;
  temas: Types.ObjectId[]; // Usar Types.ObjectId en lugar de Schema.Types.ObjectId
}

export const CursoSchema = new Schema<Curso>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    titulo: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    temas: [{ type: Schema.Types.ObjectId, ref: 'Tema' }]
  },
  { timestamps: true }
);
