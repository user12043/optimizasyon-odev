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

function getParams(){

  descParam = document.getElementsByClassName("taskDesc").value;
  tasksBeforeParam= document.getElementsByClassName("taskBefore").value;
  costParam= document.getElementsByClassName("taskCost").value;
  responsibleParam= document.getElementsByClassName("taskResponsible").value;
  colorParam = document.getElementsByClassName("taskColor").value;

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
  registerEvents();
}

function onTaskDescChange(e) {
  const taskId = e.target.parentElement.parentElement.id;
  project.find(taskId, project.tasks).description = e.target.value;
}

function onTasksBeforeChange(e) {
  const taskId = e.target.parentElement.parentElement.id;
  console.log(taskId + ": desc=" + e.target.value);
}

function onTaskCostChange(e) {
  const taskId = e.target.parentElement.parentElement.id;
  console.log(taskId + ": desc=" + e.target.value);
}
function onTaskResponsibleChange(e) {
  const taskId = e.target.parentElement.parentElement.id;
  console.log(taskId + ": desc=" + e.target.value);
}
function onTaskColorChange(e) {
  const taskId = e.target.parentElement.parentElement.id;
  console.log(taskId + ": desc=" + e.target.value);
}
export function registerEvents() {
  document.getElementById("addTaskBtn").onclick = addTask;

  if (!project.tasks.length) {
    return;
  }

  const taskDescInputs = document.getElementsByClassName("taskDesc");
  for (let a = 0; a < taskDescInputs.length; a++)
    taskDescInputs[a].onchange = onTaskDescChange;

  const tasksBeforeInputs = document.getElementsByClassName("tasksBefore");
  for (let a = 0; a < taskDescInputs.length; a++)
    tasksBeforeInputs[a].onchange = onTasksBeforeChange;

  const taskCostInputs = document.getElementsByClassName("taskCost");
  for (let a = 0; a < taskCostInputs.length; a++)
    taskCostInputs[a].onchange = onTaskCostChange;

  const taskResponsibleInputs = document.getElementsByClassName("taskResponsible");
  for (let a = 0; a < taskResponsibleInputs.length; a++)
    taskResponsibleInputs[a].onchange = onTaskResponsibleChange;

  const taskColorInputs = document.getElementsByClassName("taskColor");
  for (let a = 0; a < taskColorInputs.length; a++)
    taskColorInputs[a].onchange = onTaskColorChange;


  // gibi
}
