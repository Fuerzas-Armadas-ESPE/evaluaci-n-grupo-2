// tema.model.ts
import { Schema, Document } from 'mongoose';

export interface Tema extends Document {
  titulo: string;
  createdAt: Date;
  revisado: boolean;
}

export const TemaSchema = new Schema<Tema>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    titulo: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    revisado: { type: Boolean, default: false }
  },
  { timestamps: true }
);
