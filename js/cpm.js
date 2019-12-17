import project from "./project.js";

//            https://www.codeproject.com/Articles/25312/Critical-Path-Method-Implementation-in-C

//           burdaki kodu js çevirmeye çalıştık.
// syntax hataları olabilir !!!!!
// bunları index.js de calculate

export function walkListAhead() {
  const { tasks } = project;
  const { length } = tasks;
  tasks[0].earliestStartTime = 0;
  tasks[0].earliestEndTime = tasks[0].earliestStartTime + +tasks[0].cost;
  tasks[0].latestStartTime = 0;
  tasks[0].latestEndTime = 0;

  for (let i = 1; i < length; i++) {
    for (let beforeTaskIndex in tasks[i].tasksBefore) {
      const task = project.find(tasks[i].tasksBefore[beforeTaskIndex], tasks);
      if (tasks[i].earliestStartTime < task.earliestEndTime)
        tasks[i].earliestStartTime = task.earliestEndTime;
    }

    tasks[i].earliestEndTime = tasks[i].earliestStartTime + +tasks[i].cost;
  }
}

export function walkListAback() {
  const { tasks } = project;
  const { length } = tasks;

  tasks[length - 1].latestEndTime = tasks[length - 1].earliestEndTime || 0;
  tasks[length - 1].latestStartTime =
    tasks[length - 1].latestEndTime - +tasks[length - 1].cost;

  for (let i = length - 2; i >= 0; i--) {
    for (let afterIndex in tasks[i].tasksAfter) {
      const task = project.find(tasks[i].tasksAfter[afterIndex], tasks);
      if (tasks[i].latestEndTime == 0)
        tasks[i].latestEndTime = task.latestStartTime;
      else if (tasks[i].latestEndTime > task.latestStartTime)
        tasks[i].latestEndTime = task.latestStartTime;
    }

    tasks[i].latestStartTime = tasks[i].latestEndTime - tasks[i].cost;
  }
}

export function criticalPath() {
  const { tasks } = project;
  const { length } = tasks;
  console.log("\nCritical Path: ");

  for (let taskIndex in tasks) {
    const task = tasks[taskIndex];
    if (
      task.earliestEndTime - task.latestEndTime == 0 &&
      task.earliestStartTime - task.latestStartTime == 0
    ) {
      console.log(task.id);
      task.isCritical = true;
    }
  }

  const duration = tasks[length - 1].earliestEndTime;
  console.log("\n Total duration: \n\n" + duration);
  $("#header").html("Total duration:" + duration);
}
