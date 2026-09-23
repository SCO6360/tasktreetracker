import { Goal, Step } from "./types";

export function isStepDone(step: Step): boolean {
  return step.tasks.length > 0 && step.tasks.every((task) => task.done);
}

export function isGoalDone(goal: Goal): boolean {
  return goal.steps.length > 0 && goal.steps.every(isStepDone);
}