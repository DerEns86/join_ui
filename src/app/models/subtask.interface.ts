import { TaskInterface } from './Task.interface';

export interface SubtaskInterface {
  id: number;
  name: string;
  isCompleted: boolean;
  task: TaskInterface;
}
