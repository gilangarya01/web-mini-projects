import {
  getAllMyTodo,
  createList,
  changeTodo,
  deleteTodo,
  generateList,
} from "./utils.js";

// Get references to HTML elements
const todoArea = document.getElementById("todo-area");
const addTodo = document.getElementById("add-btn");
const editTodo = document.getElementById("edit-todo");
const titleTodo = document.getElementById("title-todo");

// Retrieve stored todo list from localStorage
let myTodo = getAllMyTodo();
let id = localStorage.getItem("idDetail");

console.log(myTodo[id]);

// Populate the title and todo list items
if (id in myTodo) {
  titleTodo.value = myTodo[id].title;
  myTodo[id].todoList.forEach((todo) => {
    todoArea.appendChild(generateList(todo));
  });
}

// Event listeners
addTodo.addEventListener("click", handleAddTodo);
editTodo.addEventListener("click", handleEditTodo);

/**
 * Handles adding a new todo item
 */
function handleAddTodo() {
  const inputTodo = document.getElementById("input-todo");
  if (inputTodo.value.trim() === "") return;

  todoArea.appendChild(createList(inputTodo.value));
  inputTodo.value = ""; // Clear input field after adding
  attachDeleteEvent();
}

/**
 * Handles editing the todo list and saving changes
 */
function handleEditTodo() {
  if (titleTodo.value.trim() === "") return;

  let todoArray = changeTodo();
  myTodo[id] = {
    title: titleTodo.value,
    todoList: todoArray,
  };

  localStorage.setItem("myTodo", JSON.stringify(myTodo));
  window.location.href = "../index.html"; // Redirect to main page
}

/**
 * Attaches delete event listeners to delete buttons
 */
function attachDeleteEvent() {
  document.querySelectorAll(".delete-todo").forEach((button) => {
    button.addEventListener("click", deleteTodo);
  });
}

// Initial setup: Attach delete event listeners
attachDeleteEvent();
