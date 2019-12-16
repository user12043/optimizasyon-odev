import project from "./project.js";

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
  newNode.prepend(taskId);
  document.getElementById("inputTableBody").appendChild(newNode);

  //project.tasks.push(<yeni task objesi>);
  project.tasks.push({
    id: taskId
  });
  appendSelectOption(taskId);
  registerEvents();
}

function appendSelectOption(id) {
  const taskId = id;
  for (let index = 0; index < project.tasks.length; index++) {
    const sel = document.getElementsByClassName("tasksBefore")[index];
    const option = document.createElement("option");
    option.value = taskId;
    option.text = taskId;
    sel.appendChild(option);
  }
}

export function removeTask(id) {
  let taskId = id;
   //console.log(taskId);
  console.log("removeTask is working");
  project.tasks = $.grep(project.tasks, function(e) {
    return e.id != taskId;
  });
  console.log(project.tasks);
  registerEvents();
}

export function registerEvents() {
  document.getElementById("addTaskBtn").onclick = addTask;
  const estimatedTotalCostInputs = document.getElementsByClassName(
    "EstimatedTotalCost"
  );
  for (let a = 0; a < estimatedTotalCostInputs.length; a++)
    estimatedTotalCostInputs[a].onchange = onEstimatedTotalCostChange;

  if (!project.tasks.length) {
    return;
  }

  const taskDescInputs = document.getElementsByClassName("taskDesc");
  for (let a = 0; a < taskDescInputs.length; a++)
    taskDescInputs[a].onchange = onTaskDescChange;

  

  for (let index = 1; index < project.tasks.length; index++) {
    const tasksBefore = document.getElementsByClassName("tasksBefore")[index];
    for (let a = 0; a < tasksBefore.length; a++)
    tasksBefore.onclick = taskBeforeChange;
  
  }
  

  const taskCostInputs = document.getElementsByClassName("taskCost");
  for (let a = 0; a < taskCostInputs.length; a++)
    taskCostInputs[a].onchange = onTaskCostChange;

  const taskResponsibleInputs = document.getElementsByClassName("taskResponsible");
  for (let a = 0; a < taskResponsibleInputs.length; a++)
    taskResponsibleInputs[a].onchange = onTaskResponsibleChange;

  const taskColorInputs = document.getElementsByClassName("taskColor");
  for (let a = 0; a < taskColorInputs.length; a++)
    taskColorInputs[a].onchange = onTaskColorChange;
}
var optionVal = new Array();
function onEstimatedTotalCostChange(e) {
  let projectEstTotalCost = e.target.value;
  project.estimatedTotalCost = projectEstTotalCost;
  console.log(": Estimated Total Cost=" + project.estimatedTotalCost);
}

function onTaskDescChange(e) {
  let taskId = e.target.parentElement.parentElement.id;
  project.find(taskId, project.tasks).description = e.target.value;
  //console.log(taskId + ": taskbefore=" + e.target.value);
  console.log(taskId + ": descs:" + project.find(taskId, project.tasks).description);
}
function taskBeforeChange(e) {
  let taskId = e.target.parentElement.parentElement.parentElement.id;
  console.log("taskId = "+taskId);
  project.find(taskId, project.tasks).tasksBefore = $(e.target.parentElement).val();
  optionVal=$(e.target.parentElement).val()
  console.log( " = " +optionVal);
}
function onTaskCostChange(e) {
  let taskId = e.target.parentElement.parentElement.id;
  project.find(taskId, project.tasks).cost = e.target.value;
  console.log(
    taskId + ": taskcost=" + project.find(taskId, project.tasks).cost
  );
}
function onTaskResponsibleChange(e) {
  let taskId = e.target.parentElement.parentElement.id;
  project.find(taskId, project.tasks).responsible = e.target.value;
  console.log(
    taskId + ": responsible=" + project.find(taskId, project.tasks).responsible
  );
}
function onTaskColorChange(e) {
  let taskId = e.target.parentElement.parentElement.id;
  project.find(taskId, project.tasks).color = e.target.value;
  console.log(taskId + ": color=" + project.find(taskId, project.tasks).color);
}
