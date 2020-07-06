import { User } from '../index';

export interface Room {

  id: string;

  name: string;

  clients?: User[];
}
