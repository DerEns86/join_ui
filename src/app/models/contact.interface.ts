import { UpdateMessage } from './enums/updateMessage.enum';
import { TaskInterface } from './task.interface';

export interface ContactInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tasks: TaskInterface[];
  createdBy: number;
  updatedBy: number;
  updatedAt: Date;
  updateMessage: UpdateMessage;
}
