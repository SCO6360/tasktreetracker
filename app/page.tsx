"use client";

import { useState } from "react";
import { Goal } from "@/lib/types";
import {
  isGoalDone,
  isStepDone,
  stepProgress,
  goalProgress,
} from "@/lib/progress";
import { makeId } from "@/lib/id";
import GoalEditor from "@/components/GoalEditor";

const sampleGoal: Goal = {
  id: "g1",
  title: "Launch task tracker",
  createdAt: new Date().toISOString(),
  steps: [
    {
      id: "s1",
      title: "Set up project",
      tasks: [
        { id: "t1", title: "Scaffold Next.js", done: true },
        { id: "t2", title: "Create types", done: true },
      ],
    },
    {
      id: "s2",
      title: "Build UI",
      tasks: [
        { id: "t3", title: "Show sample goal", done: true },
        { id: "t4", title: "Add goal form", done: false },
      ],
    },
  ],
};

function emptyGoal(): Goal {
  return {
    id: makeId(),
    title: "",
    steps: [],
    createdAt: new Date().toISOString(),
  };
}

function Check({ done, size = "h-5 w-5" }: { done: boolean; size?: string }) {
  return (
    <span
      className={`flex ${size} shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors ${
        done
          ? "border-emerald-500 bg-emerald-500 text-white"
          : "border-zinc-300 dark:border-zinc-600"
      }`}
    >
      {done && "✓"}
    </span>
  );
}

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
      <div
        className="h-full rounded-full bg-emerald-500 transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

function GoalCard({ goal, onEdit }: { goal: Goal; onEdit: () => void }) {
  const percent = goalProgress(goal);

  return (
    <div>
      <div className="flex items-center gap-3">
        <Check done={isGoalDone(goal)} size="h-7 w-7" />
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {goal.title}
        </h2>
        <button
          onClick={onEdit}
          className="ml-auto rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        >
          Edit
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <ProgressBar percent={percent} />
        <span className="text-sm font-medium text-zinc-500">{percent}%</span>
      </div>

      <div className="mt-6 space-y-4">
        {goal.steps.map((step) => (
          <section
            key={step.id}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-center gap-3">
              <Check done={isStepDone(step)} />
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                {step.title}
              </h3>
              <span className="ml-auto text-xs text-zinc-500">
                {stepProgress(step)}%
              </span>
            </div>

            <ul className="mt-4 space-y-2 border-l border-zinc-200 pl-5 dark:border-zinc-800">
              {step.tasks.map((task) => (
                <li key={task.id} className="flex items-center gap-3">
                  <Check done={task.done} size="h-4 w-4" />
                  <span
                    className={
                      task.done
                        ? "text-zinc-400 line-through"
                        : "text-zinc-700 dark:text-zinc-300"
                    }
                  >
                    {task.title}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [goals, setGoals] = useState<Goal[]>([sampleGoal]);
  const [editing, setEditing] = useState<Goal | null>(null);

  function saveGoal(saved: Goal) {
    setGoals((prev) => {
      const exists = prev.some((g) => g.id === saved.id);
      return exists
        ? prev.map((g) => (g.id === saved.id ? saved : g))
        : [...prev, saved];
    });
    setEditing(null);
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 dark:bg-zinc-950">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 flex items-center justify-between">
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Task Tree Tracker
          </span>
          <button
            onClick={() => setEditing(emptyGoal())}
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
          >
            + New Goal
          </button>
        </div>

        {goals.length === 0 ? (
          <p className="text-center text-zinc-500">
            No goals yet. Click + New Goal to start.
          </p>
        ) : (
          <div className="space-y-16">
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onEdit={() => setEditing(goal)}
              />
            ))}
          </div>
        )}
      </div>

      {editing && (
        <GoalEditor
          key={editing.id}
          initialGoal={editing}
          onSave={saveGoal}
          onCancel={() => setEditing(null)}
        />
      )}
    </main>
  );
}