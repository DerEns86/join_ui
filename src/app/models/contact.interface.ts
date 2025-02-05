import { UpdateMessage } from './enums/UpdateMessage.enum';
import { TaskInterface } from './Task.interface';

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
