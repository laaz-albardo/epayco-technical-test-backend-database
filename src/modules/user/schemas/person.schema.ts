import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IPerson } from '../interfaces';

@Schema({ _id: false })
export class Person implements IPerson {
  @Prop({ type: String, length: 100, required: true })
  fullName: string;

  @Prop({ type: String, length: 10, required: true })
  dni: string;

  @Prop({ type: String, length: 20, required: false })
  phoneNumber: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
