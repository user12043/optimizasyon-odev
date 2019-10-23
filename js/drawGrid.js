import project from "./project.js";
import { TASK_CELL_SIZE, GRAPH_MARGIN } from "./constants.js";

// Add clear method to canvas
CanvasRenderingContext2D.prototype.clear =
  CanvasRenderingContext2D.prototype.clear ||
  function(preserveTransform) {
    if (preserveTransform) {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (preserveTransform) {
      this.restore();
    }
  };

const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
window.ctx = ctx;
// ctx.translate(1.5, 1.5);

// redraw canvas on resize
window.addEventListener(
  "resize",
  () => {
    drawProjectGraph();
  },
  true
);

function getCell(x, y) {
  return {
    x: x * TASK_CELL_SIZE + TASK_CELL_SIZE / 2 + GRAPH_MARGIN,
    y: y * TASK_CELL_SIZE + TASK_CELL_SIZE / 2 + GRAPH_MARGIN
  };
}

function drawTask(taskId, cellX, cellY) {
  cellX *= 2; // a blank column between tasks
  const { x, y } = getCell(cellX, cellY);
  // ctx.fillRect(x, y, TASK_CELL_SIZE, TASK_CELL_SIZE);
  ctx.beginPath();
  ctx.arc(x, y, TASK_CELL_SIZE / 2, 0, 360);
  ctx.strokeText(taskId, x, y);
  ctx.stroke();
}

const drawing = [];

function pushDraw({ id, column }) {
  // create the rows if not exists
  if (!drawing[column]) {
    drawing.splice(column, 0, []);
  }

  drawing[column].push({
    id
  });
}

function setColumn(task, columnIndex) {
  if (!task.column || task.column < columnIndex) {
    task.column = columnIndex;
  }
  if (task.tasksAfter.length) {
    task.tasksAfter.forEach(taskId =>
      setColumn(project.find(taskId, project.tasks), columnIndex + 1)
    );
  }
}

function draw() {
  drawing.forEach((column, x) =>
    column.forEach((row, y) => {
      drawTask(row.id, x, y);
    })
  );
}

export function drawProjectGraph() {
  ctx.clear();
  canvas.height = canvas.clientHeight;
  canvas.width = canvas.clientWidth;
  let { tasks } = project;
  const column = 0;
  const firstColumnTasks = tasks.filter(task => !task.tasksBefore.length);

  firstColumnTasks.forEach(task => {
    setColumn(task, column);
  });

  tasks.forEach(task => pushDraw(task));
  draw();
}
