import { HydratedDocument } from 'mongoose';
import { Wallet } from '../schemas';

export type WalletDocument = HydratedDocument<Wallet>;
