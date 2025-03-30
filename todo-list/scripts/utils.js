// Retrieve all todos from localStorage
export function getAllMyTodo() {
  return JSON.parse(localStorage.getItem("myTodo")) || [];
}

// Create a new todo list item
export function createList(inputTodo) {
  const list = document.createElement("li");
  list.className = "flex items-center justify-between w-full mb-3";
  list.innerHTML = `
    <div class="flex items-center w-full">
      <input
        type="checkbox"
        class="check-todo w-5 h-5 border-2 border-white rounded appearance-none checked:bg-white checked:border-black"
      />
      <input
        type="text"
        class="text-white input-todo ms-5 text-xl font-light border-none outline-none flex-1"
        placeholder="Todo ..."
        value="${inputTodo}"
      />
    </div>
    <button
      type="button"
      class="delete-todo h-10 w-10 bg-red-800 hover:bg-red-900 rounded-lg border-2 border-black shadow-sm cursor-pointer flex items-center justify-center ml-2"
    >
      <i class="fa-solid fa-trash"></i>
    </button>
  `;
  return list;
}

// Generate todo list item
export function generateList(todo) {
  const list = document.createElement("li");
  list.className = "flex items-center justify-between w-full mb-3";
  list.innerHTML = `
          <div class="flex items-center w-full">
            <input
              id="checked-checkbox"
              type="checkbox"
              class="check-todo w-5 h-5 border-2 border-white rounded appearance-none checked:bg-white checked:border-black"
              ${todo.checked ? "checked" : ""}
            />
            <input
              type="text"
              class="text-white input-todo ms-5 text-xl font-light border-none outline-none flex-1"
              placeholder="Todo ..."
              value="${todo.name}"
            />
          </div>
          <button
            type="button"
            class="delete-todo h-10 w-10 bg-red-800 hover:bg-red-900 rounded-lg border-2 border-black shadow-sm cursor-pointer flex items-center justify-center ml-2"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
  `;
  return list;
}

// Update the todo list based on user input
export function changeTodo() {
  return Array.from(document.querySelectorAll(".input-todo")).map(
    (input, i) => ({
      name: input.value,
      checked: document.querySelectorAll(".check-todo")[i].checked,
    })
  );
}

// Remove a todo item from the DOM
export function deleteTodo(event) {
  event.target.closest("li")?.remove();
}
