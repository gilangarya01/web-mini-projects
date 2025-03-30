document.addEventListener("DOMContentLoaded", function () {
  const dropdownBtn = document.querySelector(".dropdown-btn");
  const dropdownContent = document.querySelector(".dropdown-content");

  dropdownContent.addEventListener("click", function (event) {
    if (event.target.tagName === "DIV") {
      dropdownBtn.textContent = event.target.textContent; // Tampilkan teks yang dipilih
      dropdownBtn.dataset.value = event.target.dataset.value; // Simpan value sebagai dataset
      dropdownContent.classList.remove("show");
    }
  });

  dropdownBtn.addEventListener("click", function () {
    dropdownContent.classList.toggle("show");
  });

  document.addEventListener("click", function (event) {
    if (
      !dropdownBtn.contains(event.target) &&
      !dropdownContent.contains(event.target)
    ) {
      dropdownContent.classList.remove("show");
    }
  });
});

// Ambil value dropdown
// const selectedValue = document.querySelector(".dropdown-btn").dataset.value;
// console.log("Mata Pelajaran yang dipilih:", selectedValue);
