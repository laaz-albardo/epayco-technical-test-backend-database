import { HydratedDocument } from 'mongoose';
import { Order } from '../schemas';

export type OrderDocument = HydratedDocument<Order>;
