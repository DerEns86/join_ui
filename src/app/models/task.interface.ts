import { ContactInterface } from './contact.interface';
import { Priority } from './enums/priority.enum';
import { Status } from './enums/status.enum';
import { UpdateMessage } from './enums/updateMessage.enum';
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
