import { getAllMyTodo, createList, changeTodo, deleteTodo } from "./utils.js";

const todoArea = document.getElementById("todo-area");
const addTodo = document.getElementById("add-btn");
const saveTodo = document.getElementById("save-todo");
const titleTodo = document.getElementById("title-todo");
let myTodo = getAllMyTodo();

addTodo.addEventListener("click", handleAddTodo);
saveTodo.addEventListener("click", handleSaveTodo);

function handleAddTodo() {
  const inputTodo = document.getElementById("input-todo");
  if (inputTodo.value.trim()) {
    todoArea.appendChild(createList(inputTodo.value.trim()));
    inputTodo.value = "";
    addDeleteListeners();
  }
}

function handleSaveTodo() {
  if (titleTodo.value.trim()) {
    myTodo.push({ title: titleTodo.value.trim(), todoList: changeTodo() });
    localStorage.setItem("myTodo", JSON.stringify(myTodo));
    window.location.href = "../index.html";
  }
}

function addDeleteListeners() {
  document
    .querySelectorAll(".delete-todo")
    .forEach((button) => button.addEventListener("click", deleteTodo));
}

addDeleteListeners();
