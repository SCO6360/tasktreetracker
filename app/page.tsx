import { Goal } from "@/lib/types";
import {
  isGoalDone,
  isStepDone,
  stepProgress,
  goalProgress,
} from "@/lib/progress";

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

export default function Home() {
  const percent = goalProgress(sampleGoal);

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 dark:bg-zinc-950">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Goal
        </p>
        <div className="mt-2 flex items-center gap-3">
          <Check done={isGoalDone(sampleGoal)} size="h-7 w-7" />
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {sampleGoal.title}
          </h1>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <ProgressBar percent={percent} />
          <span className="text-sm font-medium text-zinc-500">{percent}%</span>
        </div>

        <div className="mt-10 space-y-4">
          {sampleGoal.steps.map((step) => (
            <section
              key={step.id}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center gap-3">
                <Check done={isStepDone(step)} />
                <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {step.title}
                </h2>
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
    </main>
  );
}