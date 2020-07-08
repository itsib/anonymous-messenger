import { User } from '..';

export interface Room {

  _id?: string;

  name?: string;

  protected?: boolean;

  clients?: User[];
}
