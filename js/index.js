import { registerEvents } from "./userInput.js";
import { removeTask } from "./userInput.js";


import project from "./project.js";
// const canvas = document.getElementById("canvas");
// let ctx = canvas.getContext("2d");
// window.ctx = ctx;
/*
// rectangle
ctx.fillStyle = "#747fac";
ctx.fillRect(0, 0, 50, 60);

// line
ctx.moveTo(50, 0);
ctx.lineTo(100, 100);
ctx.stroke();

// circle
ctx.beginPath();
ctx.arc(400, 40, 30, 0, 2 * Math.PI);
ctx.stroke(); */
window.project = project;
project.clear(project)
registerEvents();
$("#inputTableBody").on('click', '.taskRemoveBtn', function() {  
    $(this).closest("tr").remove();
    let id =$(this).closest('tr').attr('id')
removeTask(id)
});
