import project from "./project.js";
import { TASK_CELL_SIZE } from "./constants.js";

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

function getCell(x, y) {
  return {
    x: x * TASK_CELL_SIZE,
    y: y * TASK_CELL_SIZE
  };
}

function drawTask(task, x, y) {
  const location = getCell(x, y);
  ctx.fillStyle = task.color;
  ctx.fillRect(location.x, location.y, TASK_CELL_SIZE, TASK_CELL_SIZE);
}

export function drawProjectGraph() {
  ctx.clear();
  let maxDependedTaskCount = -1;
  project.tasks.forEach(task => {
    const dependedTaskCount = task.tasksBefore.length;
    if (dependedTaskCount > maxDependedTaskCount) {
      maxDependedTaskCount = dependedTaskCount;
    }
  });

  if (maxDependedTaskCount == -1) {
    return;
  }

  for (let column = 0; column < maxDependedTaskCount; column++) {
    
  }

  const firstColumnTasks = project.tasks.filter(
    task => !task.tasksBefore.length
  );
  firstColumnTasks.forEach((task, index) => {
    drawTask(task, 0, index);
  });
}
