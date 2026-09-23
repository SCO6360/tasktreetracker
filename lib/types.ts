export type Task = {
  id: string;
  title: string;
  done: boolean;
};

export type Step = {
  id: string;
  title: string;
  tasks: Task[];
};

export type Goal = {
  id: string;
  title: string;
  steps: Step[];
  createdAt: string;
};