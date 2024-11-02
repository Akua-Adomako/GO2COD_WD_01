const text = "Plan It, Do It: Your Task Tracker";
const headingElement = document.getElementById("heading");
let index = 0;

function typeText() {
    if (index < text.length) {
        headingElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeText, 100); 
    }
}

window.onload = typeText;

window.addEventListener("DOMContentLoaded", () => {
    const dateElement = document.getElementById("current-date");
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = today.toLocaleDateString(undefined, options);
});

let currentEditTask = null;

function addTask(){
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");
  const taskText = taskInput.value.trim();

  if (taskText){
    if (currentEditTask){
      const taskTextElement = currentEditTask.querySelector(".task-text");
      taskTextElement.textContent = taskText;
      currentEditTask = null;
      taskInput.value = "";
    }else{
      const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    taskItem.innerHTML = `
         <input type="checkbox" class="complete-checkbox" onclick="toggleComplete(this)">
        <span class="task-text">${taskText}</span>
        <button onclick="editTask(this)" class="edit">Edit</button>
        <button onclick="deleteTask(this)" class="delete">Delete</button>
    `;

    taskList.appendChild(taskItem);

    taskInput.value = "";
    }
  }
}

/*
function editTask(button){
  const taskItem = button.parentElement;
  const taskText = taskItem.querySelector(".task-text");

  const newTaskText = prompt("Edit your task:", taskText.textContent);
    if (newTaskText) {
        taskText.textContent = newTaskText.trim();
    }
}
    */

function editTask(button){
    const taskItem = button.parentElement;
    const taskText = taskItem.querySelector(".task-text");
    const taskInput = document.getElementById("task-input"); // Access the input field

    taskInput.value = taskText.textContent; 
    currentEditTask = taskItem;
}


function deleteTask(button){
  const taskItem = button.parentElement;
  taskItem.remove();
}

function toggleComplete(checkbox){
  const taskItem = checkbox.parentElement;
  const taskText = taskItem.querySelector(".task-text");

  if(checkbox.checked){
     taskText.style.textDecoration = "line-through";
     taskText.style.color = "gray";
  } else {
        taskText.style.textDecoration = "none";
        taskText.style.color = "white";
    }
}