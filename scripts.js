const API_KEY = "38037221-2273b01c62481dfc7f61a369c";
const URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo`;

function handleFormSubmit(event) {
  event.preventDefault();

  const searchQuery = document.getElementById("searchInput").value;

  callApi(searchQuery, 1);
}

function callApi(searchQuery) {
  fetch(`${URL}&q=${encodeURIComponent(searchQuery)}&page=${page}`)
    .then((response) => response.json())
    .then((data) => displayResults(data))
    .catch((error) => console.error("Error fetching data:", error));
}

function displayResults(data) {
  const imageGallery = document.getElementById("imageGallery");
  imageGallery.innerHTML = "";

  data.hits.forEach((hit, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<img src="${hit.webformatURL}" alt="Image" id="img-${index}" />`;
    imageGallery.appendChild(card);

    const imgElement = document.getElementById(`img-${index}`);
    imgElement.addEventListener("click", () => openModal(hit));
  });
}

function openModal(hit) {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-item-details");
  modalContent.innerHTML = `<p>Image Url: ${hit.pageURL}</p>
                            <p>Image tags: ${hit.tags}</p>
                            <p>Views: ${hit.views}</p>
                            <p>Comments: ${hit.comments}</p>
                            <p>Likes: ${hit.likes}</p>
                            <p>User: ${hit.user}</p>`;

  modal.style.display = "block";

  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      closeModalFunc(modal);
    }
  });

  const closeModal = document.getElementById("close-modal");
  closeModal.addEventListener("click", () => closeModalFunc(modal));
}

function closeModalFunc(modal) {
  modal.style.display = "none";
}

const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", handleFormSubmit);

let page = 1;

function loadMoreImages() {
  const searchQuery = document.getElementById("searchInput").value;
  page++;
  callApi(searchQuery, page);
}

function displayResults(data) {
  const imageGallery = document.getElementById("imageGallery");

  if (page === 1) {
    imageGallery.innerHTML = "";
  }

  data.hits.forEach((hit, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<img src="${hit.webformatURL}" alt="Image" id="img-${index}" />`;
    imageGallery.appendChild(card);

    const imgElement = document.getElementById(`img-${index}`);
    imgElement.addEventListener("click", () => openModal(hit));
  });

  if (data.totalHits > page * 20) {
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    loadMoreBtn.hidden = false;
  } else {
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    loadMoreBtn.hidden = true;
  }
}
