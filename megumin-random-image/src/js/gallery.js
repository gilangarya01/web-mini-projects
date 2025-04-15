// Generate default gallery image
function defaultGallery() {
  const gallery = document.getElementById("gallerys");

  let defaultGallery = [
    "https://i.waifu.pics/kKhVZI7.jpg",
    "https://i.waifu.pics/Mzb-eoh.jpg",
    "https://i.waifu.pics/kStgBrk.jpg",
    "https://i.waifu.pics/aUpApFN.jpg",
    "https://i.waifu.pics/G0_HIsk.jpg",
    "https://i.waifu.pics/akURxhB.jpg",
    "https://i.waifu.pics/FgTLfzE.jpg",
    "https://i.waifu.pics/YxxVJnB.jpg",
    "https://i.waifu.pics/mKJT~Tk.jpg",
    "https://i.waifu.pics/SFagDqo.png",
    "https://i.waifu.pics/oLWiI6~.jpg",
    "https://i.waifu.pics/u0ynNOP.jpg",
    "https://i.waifu.pics/yd2PAb6.jpg",
    "https://i.waifu.pics/0qdt-W-.jpg",
    "https://i.waifu.pics/4gLNscr.jpg",
    "https://i.waifu.pics/XFLRDMa.jpg",
  ];

  let arr = defaultGallery.map(
    (e) =>
      `
            <div>
                <a href="${e}" target="_blank">
                <img
                    class="border-2 border-red-700 h-96 w-96 rounded-lg"
                    src="${e}"
                    alt=""
                />
                </a>
            </div>
        `,
  );

  gallery.innerHTML = arr.join("");
}

defaultGallery();

// Select the button with the ID "random-all"
const randomAllBtn = document.querySelector("#random-all");

// Add an event listener to the button for the "click" event
randomAllBtn.addEventListener("click", async () => {
  // Select the gallery container
  const gallery = document.querySelector(".gallery");

  // Display a loading message and spinner while fetching data
  gallery.innerHTML = `
    <div class="flex flex-row">
      <img class="w-14 rounded-full" src="../assets/images/loading.gif" />
      <p class="ms-3 mt-2 flex-1">Wait retrieving image data from API</p>
    </div>
  `;

  // Fetch multiple image URLs from the API
  const urlPic = await getManyUrlWaifuFromAPI();

  // Build the gallery HTML by iterating over the fetched URLs
  let galleryImg = "";
  urlPic.forEach((img) => {
    galleryImg += `
      <a href="${img}" target="_blank">
        <img class="border-2 border-red-700 h-96 w-96 rounded-lg" src="${img}" alt="" />
      </a>
    `;
  });

  // Update the gallery container with the new images
  gallery.innerHTML = galleryImg;
});

// Function to fetch multiple image URLs from the API
async function getManyUrlWaifuFromAPI() {
  // Create an array of 16 fetch promises
  const fetchPromises = Array.from({ length: 16 }, () =>
    fetch("https://api.waifu.pics/sfw/megumin")
      .then((response) => response.json())
      .then((data) => data.url),
  );

  // Wait for all promises to resolve and return the URLs
  return Promise.all(fetchPromises);
}
