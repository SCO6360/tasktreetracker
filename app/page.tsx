import { Goal } from "@/lib/types";
import { isGoalDone, isStepDone } from "@/lib/progress";

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

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">
        {isGoalDone(sampleGoal) ? "✅" : "⬜"} {sampleGoal.title}
      </h1>

      {sampleGoal.steps.map((step) => (
        <div key={step.id} className="ml-6 mt-4">
          <h2 className="text-lg font-semibold">
            {isStepDone(step) ? "✅" : "⬜"} {step.title}
          </h2>

          <ul className="ml-6">
            {step.tasks.map((task) => (
              <li key={task.id}>
                {task.done ? "✅" : "⬜"} {task.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}