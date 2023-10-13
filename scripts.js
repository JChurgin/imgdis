import { fetchImages } from "./api.js";
import { loadMoreImages } from "./loadMore.js";

let loadedImageCount = 0;
const imagesPerLoad = 10;

// Load images

async function loadImages(query) {
  const imageResults = document.getElementById("imageResults");

  const images = await fetchImages(query);
  for (let i = loadedImageCount; i < loadedImageCount + imagesPerLoad; i++) {
    if (i >= images.length) break;
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<img src="${images[i].webformatURL}" alt="${images[i].tags}" />`;
    imageResults.appendChild(card);
  }
  loadedImageCount += imagesPerLoad;

  const loadMoreBtn = document.getElementById("loadMoreBtn");
  loadMoreBtn.hidden = loadedImageCount >= images.length;
}

document.getElementById("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const searchInput = document.getElementById("searchInput").value;
  loadImages(searchInput);
});

// Load more images

document.getElementById("loadMoreBtn").addEventListener("click", () => {
  const searchInput = document.getElementById("searchInput").value;
  loadMoreImages(searchInput, loadedImageCount);
});

// Modal

const imageResults = document.getElementById("imageResults");

function openModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
}

window.addEventListener("click", (event) => {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    closeModal("modal");
  }
});

const closeModalBtn = document.getElementById("close-modal");
closeModalBtn.addEventListener("click", () => {
  closeModal("modal");
});

imageResults.addEventListener("click", (event) => {
  openModal();
});