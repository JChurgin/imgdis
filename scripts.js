const API_KEY = "38037221-2273b01c62481dfc7f61a369c";
const API_URL = "https://pixabay.com/api/?key=" + API_KEY;
let currentPage = 1;

document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    currentPage = 1;

    const userSearch = document.getElementById("searchInput").value;

    const searchUrl = API_URL + "&q=" + encodeURIComponent(userSearch) + "&page=" + currentPage;

    if (!userSearch) {
      const emptyInput = document.createElement("div");
      emptyInput.textContent = "Empty search box.";
      imageGallery.appendChild(emptyInput);
      return;
    }

    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => {
        const imageGallery = document.getElementById("imageGallery");
        imageGallery.innerHTML = "";

        if (parseInt(data.totalHits) > 0) {
          data.hits.forEach((hit) => {
            const card = document.createElement("div");
            card.classList.add("card");

            const img = document.createElement("img");
            img.src = hit.previewURL;
            img.setAttribute("data-details", `Tags: ${hit.tags}, Views: ${hit.views}`);

            card.appendChild(img);

            imageGallery.appendChild(card);
          });
        } else {
          const noHitsMessage = document.createElement("div");
          noHitsMessage.textContent = "No images found.";
          imageGallery.appendChild(noHitsMessage);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

function displayImageInformation(imageDetails) {
  const modalDetails = document.getElementById("modalDetails");
  modalDetails.innerHTML = `<p>${imageDetails}</p>`;
}

document
  .getElementById("imageGallery")
  .addEventListener("click", function (event) {
    const target = event.target;
    if (target.tagName === "IMG") {
      const imageDetails = target.getAttribute("data-details");
      displayImageInformation(imageDetails);

      const modal = document.getElementById("modal");
      modal.style.display = "block";
    }
  });

const closeModalButton = document.querySelector(".close");
closeModalButton.addEventListener("click", function () {
  const modal = document.getElementById("modal");
  modal.style.display = "none";

  const modalDetails = document.getElementById("modalDetails");
  modalDetails.innerHTML = "";
});

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}
window.addEventListener("click", function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    closeModal();
  }
});
