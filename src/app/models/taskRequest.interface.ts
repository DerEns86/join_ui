import { Priority } from './enums/priority.enum';
import { Status } from './enums/status.enum';
import { SubtaskInterface } from './subtask.interface';

export interface TaskRequestInterface {
  name: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate: Date;

  subtasks: SubtaskInterface[];
  // category: CategoryInterface;
  categoryName: string;
}
