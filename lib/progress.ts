import { Goal, Step } from "./types";

export function isStepDone(step: Step): boolean {
  return step.tasks.length > 0 && step.tasks.every((task) => task.done);
}

export function isGoalDone(goal: Goal): boolean {
  return goal.steps.length > 0 && goal.steps.every(isStepDone);
}

export function stepProgress(step: Step): number {
  if (step.tasks.length === 0) return 0;
  const done = step.tasks.filter((task) => task.done).length;
  return Math.round((done / step.tasks.length) * 100);
}

export function goalProgress(goal: Goal): number {
  const tasks = goal.steps.flatMap((step) => step.tasks);
  if (tasks.length === 0) return 0;
  const done = tasks.filter((task) => task.done).length;
  return Math.round((done / tasks.length) * 100);
}