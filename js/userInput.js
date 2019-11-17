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
  /**
   * bişeyler
   */
  //project.tasks.push(<yeni task objesi>);
  project.tasks.push({
    id: taskId
  }); // bunun içini doldur
  registerEvents();
}

function onTaskDescChange(e) {
  const taskId = e.target.parentElement.parentElement.id;
  console.log(taskId + ": desc=" + e.target.value);
}

export function registerEvents() {
  document.getElementById("addTaskBtn").onclick = addTask;
  // inputlar değişince tetiklenecek olayları tanımla
  // mesela cost class ından bir input değişince ilgili task objesini güncelle
  const taskDescInputs = document.getElementsByClassName("taskDesc");
  for (let a = 0; a < taskDescInputs.length; a++) {
    taskDescInputs[a].onchange = onTaskDescChange;
  }
  // gibi
}
