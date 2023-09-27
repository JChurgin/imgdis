const API_KEY = "38037221-2273b01c62481dfc7f61a369c";
const URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo`;

function handleFormSubmit(event) {
  event.preventDefault();

  const searchQuery = document.getElementById("searchInput").value;

  callApi(searchQuery, 1);
}

function callApi(queryOrTag, page) {
  const encodedQueryOrTag = encodeURIComponent(queryOrTag);

  let apiUrl;

  if (displayFavorites) {
    displayFavoriteImages();
    return;
  }

  if (queryOrTag) {
    apiUrl = `${URL}&q=${encodedQueryOrTag}&page=${page}`;
  } else {
    apiUrl = `${URL}&page=${page}`;
  }

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => displayResults(data, page))
    .catch((error) => console.error('Error fetching data:', error));
}

function displayResults(data, page) {
  if (!displayFavorites) {
    const imageGallery = document.getElementById("imageGallery");

    if (page === 1) {
      imageGallery.innerHTML = "";
    }

    const favorites = getFavoritesFromLocalStorage();

    data.hits.forEach((hit, index) => {
      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.src = hit.webformatURL;
      img.alt = "Image";
      img.id = `img-${index}`;

      const favoriteIcon = document.createElement("div");
      favoriteIcon.className = "favorite-icon";
      favoriteIcon.innerHTML = "<i class='far fa-heart'></i>";

      card.appendChild(img);
      card.appendChild(favoriteIcon);
      imageGallery.appendChild(card);

      const imgElement = document.getElementById(`img-${index}`);
      const iconElement = favoriteIcon.querySelector("i");

      if (favorites.includes(hit.webformatURL)) {
        iconElement.classList.remove("far");
        iconElement.classList.add("fas");
      }

      favoriteIcon.addEventListener("click", () =>
        toggleFavorite(hit, iconElement)
      );
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
}

function toggleFavorite(hit, iconElement) {
  const favorites = getFavoritesFromLocalStorage();
  const imageUrl = hit.webformatURL;

  if (favorites.includes(imageUrl)) {
    const updatedFavorites = favorites.filter((fav) => fav !== imageUrl);
    iconElement.classList.remove("fas");
    iconElement.classList.add("far");
    saveFavoritesToLocalStorage(updatedFavorites);
  } else {
    favorites.push(imageUrl);
    iconElement.classList.remove("far");
    iconElement.classList.add("fas");
    saveFavoritesToLocalStorage(favorites);
  }
}

function saveFavoritesToLocalStorage(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function getFavoritesFromLocalStorage() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites;
}

const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", handleFormSubmit);

let page = 1;

function loadMoreImages() {
  const searchQuery = document.getElementById("searchInput").value;
  page++;
  callApi(searchQuery, page);
}

let displayFavorites = false;

function toggleView() {
  displayFavorites = !displayFavorites;
  const toggleBtn = document.getElementById("toggleViewBtn");

  if (displayFavorites) {
    toggleBtn.innerText = "View Search Results";
    displayFavoriteImages();
  } else {
    toggleBtn.innerText = "View Favorites";
    const searchQuery = document.getElementById("searchInput").value;
    callApi(searchQuery, 1);
  }
}

function displayFavoriteImages() {
  const imageGallery = document.getElementById("imageGallery");
  imageGallery.innerHTML = "";

  const favorites = getFavoritesFromLocalStorage();

  if (favorites.length === 0) {
    imageGallery.innerHTML = "<p>No favorites yet.</p>";
    return;
  }

  favorites.forEach((favorite, index) => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = favorite;
    img.alt = "Favorite Image";
    img.id = `fav-img-${index}`;

    const favoriteIcon = document.createElement("div");
    favoriteIcon.className = "favorite-icon";
    favoriteIcon.innerHTML = "<i class='fas fa-heart'></i>";
    favoriteIcon.addEventListener("click", () =>
      removeFavorite(favorite, card)
    );

    card.appendChild(img);
    card.appendChild(favoriteIcon);
    imageGallery.appendChild(card);
  });
}

function removeFavorite(imageUrl, cardElement) {
  const favorites = getFavoritesFromLocalStorage();
  const updatedFavorites = favorites.filter((fav) => fav !== imageUrl);
  saveFavoritesToLocalStorage(updatedFavorites);
  cardElement.remove();
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

const tagButtons = document.querySelectorAll(".tag-button");

tagButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tag = button.dataset.tag;
    callApi(tag, 1);
  });
});