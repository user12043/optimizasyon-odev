import { registerEvents } from "./userInput.js";
import { removeTask } from "./userInput.js";
import { walkListAhead, walkListAback, criticalPath } from "./cpm.js";
import project from "./project.js";
import { drawProjectGraph } from "./drawGrid.js";


window.project = project;
project.clear(project);
registerEvents();
$("#inputTableBody").on("click", ".taskRemoveBtn", function() {
  $(this)
    .closest("tr")
    .remove();
  let id = $(this)
    .closest("tr")
    .attr("id");
  removeTask(id);
});

document.getElementById("calculate").onclick = () => {
  walkListAhead();
  walkListAback();
  criticalPath();
  drawProjectGraph();
};
