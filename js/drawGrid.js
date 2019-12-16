import project from "./project.js";
import { TASK_CELL_SIZE, GRAPH_MARGIN, GRAPH_FONT_SIZE } from "./constants.js";

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

// redraw canvas on resize
window.addEventListener(
  "resize",
  () => {
    drawProjectGraph();
  },
  true
);

const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
window.ctx = ctx;
// ctx.translate(1.5, 1.5);

const drawing = [];

function getCell(x, y) {
  return {
    x: x * TASK_CELL_SIZE + TASK_CELL_SIZE / 2 + GRAPH_MARGIN,
    y: y * TASK_CELL_SIZE + TASK_CELL_SIZE / 2 + GRAPH_MARGIN
  };
}

function drawTask({ id, cost, x, y }) {
  ctx.beginPath();
  ctx.arc(x, y, TASK_CELL_SIZE / 2, 0, 360);
  const style = ctx.strokeStyle;
  ctx.strokeStyle = "#FF0000";
  ctx.strokeText(
    id,
    x - GRAPH_FONT_SIZE / 4,
    y + GRAPH_FONT_SIZE / 4 - GRAPH_FONT_SIZE * 0.25
  );

  ctx.strokeStyle = "#000000";
  const xFactor = cost ? cost.length * GRAPH_FONT_SIZE * 0.2 : 0;
  ctx.strokeText(
    cost || "",
    x - GRAPH_FONT_SIZE / 4 - xFactor,
    y + GRAPH_FONT_SIZE / 4 + GRAPH_FONT_SIZE * 0.75
  );
  ctx.strokeStyle = style;
  ctx.stroke();
}

function pushDraw({ id, column, cost }) {
  // create the rows if not exists
  if (!drawing[column]) {
    drawing.splice(column, 0, []);
  }

  drawing[column].push({
    id,
    cost,
    x: getCell(column * 2, drawing[column].length).x,
    y: getCell(column, drawing[column].length * 2).y
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

function drawLines() {
  drawing.forEach(column => {
    column.forEach(({ id, x, y }) => {
      const { tasks } = project;
      // find related task
      const task = project.find(id, tasks);
      // iterate tasks after
      task.tasksAfter.forEach(afterTaskId => {
        const afterTask = project.find(afterTaskId, tasks);
        // find task in drawing
        drawing[afterTask.column].find(row => {
          if (row.id == afterTaskId) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(row.x, row.y);
            ctx.stroke();
          }
        });
      });
    });
  });
}

function draw() {
  // draw task circles
  drawing.forEach(column =>
    column.forEach(row => {
      drawTask(row);
    })
  );

  // draw lines
  drawLines();
}

export function drawProjectGraph() {
  canvas.height = canvas.clientHeight;
  canvas.width = canvas.clientWidth;
  ctx.clear();
  ctx.font = GRAPH_FONT_SIZE + "px sans-serif";
  drawing.splice(0, drawing.length);
  let { tasks } = project;
  const column = 0;
  const firstColumnTasks = tasks.filter(task => !task.tasksBefore.length);

  firstColumnTasks.forEach(task => {
    setColumn(task, column);
  });

  tasks.forEach(task => pushDraw(task));
  draw();
}
