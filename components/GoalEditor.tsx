"use client";

import { useState } from "react";
import { Goal, Step, Task } from "@/lib/types";
import { makeId } from "@/lib/id";

type Props = {
  initialGoal: Goal;
  onSave: (goal: Goal) => void;
  onCancel: () => void;
};

export default function GoalEditor({ initialGoal, onSave, onCancel }: Props) {
  const [draft, setDraft] = useState<Goal>(initialGoal);

  function addStep() {
    setDraft((prev) => ({
      ...prev,
      steps: [...prev.steps, { id: makeId(), title: "", tasks: [] }],
    }));
  }

  function updateStep(stepId: string, changes: Partial<Step>) {
    setDraft((prev) => ({
      ...prev,
      steps: prev.steps.map((s) =>
        s.id === stepId ? { ...s, ...changes } : s
      ),
    }));
  }

  function removeStep(stepId: string) {
    setDraft((prev) => ({
      ...prev,
      steps: prev.steps.filter((s) => s.id !== stepId),
    }));
  }

  function addTask(stepId: string) {
    setDraft((prev) => ({
      ...prev,
      steps: prev.steps.map((s) =>
        s.id === stepId
          ? {
              ...s,
              tasks: [...s.tasks, { id: makeId(), title: "", done: false }],
            }
          : s
      ),
    }));
  }

  function updateTask(stepId: string, taskId: string, changes: Partial<Task>) {
    setDraft((prev) => ({
      ...prev,
      steps: prev.steps.map((s) =>
        s.id === stepId
          ? {
              ...s,
              tasks: s.tasks.map((t) =>
                t.id === taskId ? { ...t, ...changes } : t
              ),
            }
          : s
      ),
    }));
  }

  function removeTask(stepId: string, taskId: string) {
    setDraft((prev) => ({
      ...prev,
      steps: prev.steps.map((s) =>
        s.id === stepId
          ? { ...s, tasks: s.tasks.filter((t) => t.id !== taskId) }
          : s
      ),
    }));
  }

  function handleSave() {
    const title = draft.title.trim();
    if (!title) return;

    const cleaned: Goal = {
      ...draft,
      title,
      steps: draft.steps
        .map((s) => ({
          ...s,
          title: s.title.trim(),
          tasks: s.tasks
            .map((t) => ({ ...t, title: t.title.trim() }))
            .filter((t) => t.title),
        }))
        .filter((s) => s.title),
    };

    onSave(cleaned);
  }

  const canSave = draft.title.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="flex max-h-[85vh] w-full max-w-xl flex-col rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex-1 overflow-y-auto p-6">
          <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Goal
          </label>
          <input
            autoFocus
            value={draft.title}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Name your goal..."
            className="mt-1 w-full bg-transparent text-2xl font-semibold text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-50"
          />

          <div className="mt-6 space-y-4">
            {draft.steps.map((step, i) => (
              <div
                key={step.id}
                className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-zinc-500">
                    Step {i + 1}
                  </span>
                  <input
                    value={step.title}
                    onChange={(e) =>
                      updateStep(step.id, { title: e.target.value })
                    }
                    placeholder="Step name..."
                    className="flex-1 bg-transparent font-medium text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
                  />
                  <button
                    onClick={() => removeStep(step.id)}
                    className="text-zinc-400 hover:text-red-500"
                    aria-label="Remove step"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-3 space-y-2 border-l border-zinc-200 pl-4 dark:border-zinc-800">
                  {step.tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-2">
                      <input
                        value={task.title}
                        onChange={(e) =>
                          updateTask(step.id, task.id, {
                            title: e.target.value,
                          })
                        }
                        placeholder="Task..."
                        className="flex-1 rounded-lg border border-zinc-200 bg-transparent px-3 py-1.5 text-sm text-zinc-800 outline-none focus:border-emerald-500 dark:border-zinc-700 dark:text-zinc-200"
                      />
                      <button
                        onClick={() => removeTask(step.id, task.id)}
                        className="text-zinc-400 hover:text-red-500"
                        aria-label="Remove task"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addTask(step.id)}
                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                  >
                    + Add task
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addStep}
            className="mt-4 w-full rounded-xl border-2 border-dashed border-zinc-300 py-3 text-sm font-medium text-zinc-500 hover:border-emerald-500 hover:text-emerald-600 dark:border-zinc-700"
          >
            + Add step
          </button>
        </div>

        <div className="flex justify-end gap-2 border-t border-zinc-200 p-4 dark:border-zinc-800">
          <button
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!canSave}
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}