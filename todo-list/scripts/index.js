// Generate a single todo card
function generateTodoCard(todo, index) {
  return `
    <div class="bg-gray-200 rounded-lg border-2 border-black block-shadow-lg p-3 w-full md:w-52 h-52 md:h-60">
      <h3 class="font-semibold">${todo.title}</h3>
      <div class="mt-3">
        ${todo.todoList
          .slice(0, 5)
          .map(
            (item, i) => `
              <div class="flex items-center mb-1">
                <input
                  type="checkbox"
                  class="w-4 h-4 border-2 border-black rounded appearance-none checked:bg-black checked:border-black"
                  ${item.checked ? "checked" : ""}
                  disabled
                />
                <label class="ms-2 text-sm font-medium">${item.name}</label>
              </div>
            `,
          )
          .join("")}
      </div>
      <div class="fixed right-0 bottom-0 m-2">
        <button type="button" id="${index}" class="detail-btn h-8 w-8 bg-yellow-400 hover:bg-yellow-500 rounded-lg border-2 border-black cursor-pointer">
          <i id="${index}" class="fa-solid fa-pencil"></i>
        </button>
        <button type="button" id="${index}" class="delete-btn h-8 w-8 bg-red-600 hover:bg-red-700 rounded-lg border-2 border-black cursor-pointer">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  `;
}

// Handle detail button click
function handleDetailButtonClick(event) {
  localStorage.setItem("idDetail", event.target.id);
  window.location.href = "./pages/detail-todos.html";
}

// Handle delete button click
function handleDeleteButtonClick(button, dataAllTodo) {
  dataAllTodo.splice(button.id, 1);
  localStorage.setItem("myTodo", JSON.stringify(dataAllTodo));
  window.location.reload();
}

const cardTodo = document.getElementById("card-todo");
if (localStorage.getItem("myTodo")) {
  const dataAllTodo = JSON.parse(localStorage.getItem("myTodo"));
  cardTodo.innerHTML = dataAllTodo.map(generateTodoCard).join("");
  document
    .querySelectorAll(".detail-btn")
    .forEach((button) =>
      button.addEventListener("click", handleDetailButtonClick),
    );
  document
    .querySelectorAll(".delete-btn")
    .forEach((button) =>
      button.addEventListener("click", () =>
        handleDeleteButtonClick(button, dataAllTodo),
      ),
    );
}
