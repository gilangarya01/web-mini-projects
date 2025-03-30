const START_BTN = document.getElementById("start-btn");
const DROPDOWN_BTN = document.querySelector(".dropdown-btn");
const TEXT_WARNING = document.querySelector(".text-warning");

START_BTN.addEventListener("click", handleStartButtonClick);

function handleStartButtonClick() {
  const selectedValue = DROPDOWN_BTN.dataset.value;

  if (!selectedValue) {
    TEXT_WARNING.style.display = "inline";
    return;
  }

  TEXT_WARNING.style.display = "none";
  localStorage.setItem("subject", selectedValue);
  window.location.href = "./pages/quiz.html";
}
