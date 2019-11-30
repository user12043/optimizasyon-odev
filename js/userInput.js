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

  registerEvents();
}

function removeTask() {
  let taskId = e.target.parentElement.parentElement.id;
console.log(taskId)

registerEvents();
}





export function registerEvents() {

  document.getElementById("addTaskBtn").onclick = addTask;
  
  $("#inputTableBody").on('click', '.taskRemoveBtn', function() {
  $(this).closest("tr").remove();
  
});
   

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

    
  }

function onTaskDescChange(e) {
  let taskId = e.target.parentElement.parentElement.id;
  project.find(taskId, project.tasks).description = e.target.value;
  //console.log(taskId + ": taskbefore=" + e.target.value);
  console.log(taskId + ": descs:" + project.find(taskId, project.tasks).description)
}

function onTasksBeforeChange(e) {
  let taskId = e.target.parentElement.parentElement.id;
  project.find(taskId, project.tasks).tasksBefore = e.target.value;
  console.log(taskId + ": taskbefore=" + project.find(taskId, project.tasks).taskBefore);
}
function onTaskCostChange(e) {
  let taskId = e.target.parentElement.parentElement.id;
  project.find(taskId, project.tasks).cost = e.target.value
  console.log(taskId + ": taskcost=" + project.find(taskId, project.tasks).cost);
}
function onTaskResponsibleChange(e) {
  let taskId = e.target.parentElement.parentElement.id;
  project.find(taskId, project.tasks).responsible = e.target.value;
  console.log(taskId + ": responsible=" + project.find(taskId, project.tasks).responsible);
}
function onTaskColorChange(e) {
  let taskId = e.target.parentElement.parentElement.id;
  project.find(taskId, project.tasks).color = e.target.value
  console.log(taskId + ": color=" + project.find(taskId, project.tasks).color);
}
