const RESULT_QUIZ = document.getElementById("result-quiz");
const RESULT = localStorage.getItem("result");

if (RESULT_QUIZ && RESULT !== null) {
  RESULT_QUIZ.textContent = RESULT;
} else {
  console.error(
    "Result element not found or no result stored in localStorage."
  );
}
