import { matematika, sejarah, ipa, ips } from "./questions.js";

// Constants
const SUBJECT = localStorage.getItem("subject")?.toLocaleLowerCase();
const QUESTION_ELEMENT = document.getElementById("question");
const ANSWER_RADIO = document.querySelectorAll(".answer-area input");
const ANSWER_LABEL = document.querySelectorAll(".answer-area label");
const NEXT_BTN = document.getElementById("next-btn");
const TITLE_SUBJECT = document.getElementById("title-subject");
const TIMER = document.getElementById("timer");

// Variables
let count = 0;
let result = 0;
let acakSoal, dataSoal;
let timeLeft = 10;
let timerTimeout;

// Validasi subject
if (!SUBJECT || !["matematika", "sejarah", "ipa", "ips"].includes(SUBJECT)) {
  alert("Subject tidak valid!");
  window.location.href = "./index.html";
}

// Set the subject title
TITLE_SUBJECT.textContent = SUBJECT.toUpperCase();

// Randomize questions based on subject
const SUBJECT_QUESTIONS = {
  matematika: matematika,
  sejarah: sejarah,
  ipa: ipa,
  ips: ips,
};

acakSoal = SUBJECT_QUESTIONS[SUBJECT]?.sort(() => Math.random() - 0.5) || [];

// Display the first question
displayQuestion();
displayAnswers();
startTimer(); // Mulai timer setelah pertanyaan pertama ditampilkan

// Nonaktifkan tombol Next secara default
NEXT_BTN.disabled = true;

// Event listener untuk input radio
ANSWER_RADIO.forEach((radio) => {
  radio.addEventListener("change", () => {
    // Aktifkan tombol Next jika ada input radio yang dipilih
    NEXT_BTN.disabled = false;
  });
});

// Event listener for the next button
NEXT_BTN.addEventListener("click", handleNextButtonClick);

// Timer function menggunakan setTimeout
function startTimer() {
  TIMER.textContent = timeLeft;

  timerTimeout = setTimeout(() => {
    if (timeLeft > 0) {
      timeLeft--;
      startTimer(); // Panggil diri sendiri secara rekursif
    } else {
      handleNextButtonClick(); // Lanjut ke pertanyaan berikutnya jika waktu habis
    }
  }, 1000); // Jalankan setiap 1000 ms (1 detik)
}

function handleNextButtonClick() {
  const selectedAnswer = getSelectedAnswer();

  // Jika jawaban benar, tambahkan skor
  if (selectedAnswer === dataSoal.correct) {
    result += 10;
  }

  // Reset timer dan lanjut ke pertanyaan berikutnya
  count++;
  if (count < acakSoal.length) {
    displayQuestion();
    displayAnswers();
    timeLeft = 10; // Reset waktu
    clearTimeout(timerTimeout); // Hentikan timer sebelumnya
    startTimer(); // Mulai timer baru
    NEXT_BTN.disabled = true; // Nonaktifkan tombol Next lagi
  } else {
    // Jika semua pertanyaan selesai, simpan hasil dan redirect ke halaman hasil
    localStorage.setItem("result", result);
    window.location.href = "./result.html";
  }
}

function getSelectedAnswer() {
  const answerElements = document.getElementsByName("answer");
  for (const element of answerElements) {
    if (element.checked) {
      element.checked = false; // Reset pilihan jawaban
      return element.value;
    }
  }
  return null; // Jika tidak ada jawaban yang dipilih
}

function displayQuestion() {
  dataSoal = acakSoal[count];
  QUESTION_ELEMENT.textContent = dataSoal.question;
}

function displayAnswers() {
  const multipleChoice = dataSoal.choice.sort(() => Math.random() - 0.5); // Acak pilihan jawaban

  ANSWER_LABEL.forEach((label, index) => {
    ANSWER_RADIO[index].value = multipleChoice[index];
    label.textContent = multipleChoice[index];
  });
}
