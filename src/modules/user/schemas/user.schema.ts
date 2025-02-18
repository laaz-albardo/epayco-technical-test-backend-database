import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IPerson, IUser } from '../interfaces';
import { PersonSchema } from './person.schema';
import { genSalt, hash } from 'bcrypt';

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.password;
      return ret;
    },
  },
})
export class User implements Partial<IUser> {
  @Prop({
    type: String,
    length: 50,
    required: true,
    lowercase: true,
    index: true,
  })
  email: string;

  @Prop({ type: String, length: 50, required: true })
  password: string;

  @Prop({ type: PersonSchema, required: true })
  person: IPerson;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (this.isNew) {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
  }

  next();
});

UserSchema.pre('insertMany', async function (next, docs: IUser[]) {
  const salt = await genSalt();

  for await (const save of docs) {
    save.password = await hash(save.password, salt);
  }

  next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
  const update: any = this.getUpdate();

  if (update.password) {
    const salt = await genSalt();
    update.password = await hash(update.password, salt);
  }

  next();
});
