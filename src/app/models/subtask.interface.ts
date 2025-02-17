import { TaskInterface } from './task.interface';

export interface SubtaskInterface {
  id: number;
  name: string;
  isCompleted: boolean;
  task: TaskInterface;
}
