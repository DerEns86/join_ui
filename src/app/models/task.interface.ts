import { ContactInterface } from './contact.interface';
import { Priority } from './enums/Priority.enum';
import { Status } from './enums/Status.enum';
import { UpdateMessage } from './enums/UpdateMessage.enum';
import { SubtaskInterface } from './subtask.interface';

export interface TaskInterface {
  id: string;
  name: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate: Date;
  createdBy: number;
  createdAt: Date;
  updatedBy: number;
  updatedAt: Date;
  updateMessage: UpdateMessage;
  contacts: ContactInterface[];
  subtasks: SubtaskInterface[];
  category: string;
}
