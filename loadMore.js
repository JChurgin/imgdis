import { fetchImages } from "./api.js";

const imagesPerLoad = 10;

async function loadMoreImages(query, loadedImageCount) {
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

export { loadMoreImages };
