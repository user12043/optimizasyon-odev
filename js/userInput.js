import project from "./project.js";
const { tasks } = project;

const letters = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ";
let letterIndex = 0;
let turn = 1;
function generateTaskId() {
  const letter = letters[letterIndex++];
  let id = letter + (turn > 1 ? turn : "");
  if (letterIndex >= letters.length) {
    turn++;
    letterIndex = 0;
  }
  return id;
}

function addTask() {
  const newNode = document.getElementById("emptyTaskTr").cloneNode(true);
  newNode.style.display = "";
  const taskId = generateTaskId();
  newNode.id = taskId;
  let idNode = document.createElement("td");
  idNode.innerText = taskId;
  newNode.prepend(idNode);
  document.getElementById("inputTableBody").appendChild(newNode);

  //tasks.push(<yeni task objesi>);
  tasks.push({
    id: taskId,
    tasksBefore: [],
    tasksAfter: []
  });
  appendSelectOption(taskId);
  registerEvents();
}

function appendSelectOption(taskId) {
  for (let index = 0; index < tasks.length; index++) {
    const sel = document.getElementsByClassName("tasksBefore")[index];
    const option = document.createElement("option");
    option.value = taskId;
    option.text = taskId;
    sel.appendChild(option);
  }
}

function removeSelectOption(taskId) {
  $("option:contains('" + taskId + "')").remove();
}

export function removeTask(taskId) {
  //console.log(taskId);
  project.removeTask(taskId, tasks);
  console.log(tasks);
  registerEvents();
  removeSelectOption(taskId);
}

function registerEventForClass(className, func) {
  const elements = $("." + className);
  for (let i = 0; i < elements.length; i++) {
    elements[i].onchange = func;
  }
}

function onEstimatedTotalCostChange(e) {
  let projectEstTotalCost = e.target.value || 1;
  project.estimatedTotalCost = +projectEstTotalCost;
  console.log("Estimated Total Cost=" + project.estimatedTotalCost);
}

function onTaskDescChange(e) {
  let taskId = e.target.parentElement.parentElement.id;
  project.find(taskId, tasks).description = e.target.value;
  //console.log(taskId + ": taskbefore=" + e.target.value);
  console.log(taskId + ": descs:" + project.find(taskId, tasks).description);
}

function onTaskBeforeChange(e) {
  let taskId = e.target.parentElement.parentElement.id;
  const value = $(e.target).val();
  console.log("taskId = " + taskId + ", tasksBefore: " + value);
  project.find(taskId, tasks).tasksBefore = value;

  // set this task after task of selected ones
  /* for (let i = 0; i < value.length; i++) {
    const tasksAfter = project.find(value[i], tasks).tasksAfter;
    if (tasksAfter.indexOf(taskId) == -1) {
      tasksAfter.push(taskId);
    }
  } */
  tasks.forEach(({ id: currentTaskId, tasksAfter }) => {
    const index = tasksAfter.indexOf(taskId);
    const currentIndex = value.indexOf(currentTaskId);
    if (index != -1) {
      if (currentIndex == -1) {
        tasksAfter.splice(index, 1);
      }
    } else {
      if (currentIndex != -1) {
        tasksAfter.push(taskId);
      }
    }
  });
}

function onTaskCostChange(e) {
  let taskId = e.target.parentElement.parentElement.id;
  project.find(taskId, tasks).cost = e.target.value;
  console.log(taskId + ": taskcost=" + project.find(taskId, tasks).cost);
}

function onTaskResponsibleChange(e) {
  let taskId = e.target.parentElement.parentElement.id;
  project.find(taskId, tasks).responsible = e.target.value;
  console.log(
    taskId + ": responsible=" + project.find(taskId, tasks).responsible
  );
}

function onTaskColorChange(e) {
  let taskId = e.target.parentElement.parentElement.id;
  project.find(taskId, tasks).color = e.target.value;
  console.log(taskId + ": color=" + project.find(taskId, tasks).color);
}

document.getElementById("addTaskBtn").onclick = addTask;
$("#estimatedTotalCost").change(onEstimatedTotalCostChange);

export function registerEvents() {
  if (!tasks.length) {
    return;
  }

  registerEventForClass("taskDesc", onTaskDescChange);
  registerEventForClass("tasksBefore", onTaskBeforeChange);
  registerEventForClass("taskCost", onTaskCostChange);
  registerEventForClass("taskResponsible", onTaskResponsibleChange);
  registerEventForClass("taskColor", onTaskColorChange);
}
