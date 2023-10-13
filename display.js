// function displayResults(data, page) {
//   if (!displayFavorites) {
//     const imageGallery = document.getElementById("imageGallery");

//     if (page === 1) {
//       imageGallery.innerHTML = "";
//     }

//     const favorites = getFavoritesFromLocalStorage();

//     data.hits.forEach((hit, index) => {
//       const card = document.createElement("div");
//       card.className = "card";

//       const img = document.createElement("img");
//       img.src = hit.webformatURL;
//       img.alt = "Image";
//       img.id = `img-${index}`;

//       const favoriteIcon = document.createElement("div");
//       favoriteIcon.className = "favorite-icon";
//       favoriteIcon.innerHTML = "<i class='far fa-heart'></i>";

//       card.appendChild(img);
//       card.appendChild(favoriteIcon);
//       imageGallery.appendChild(card);

//       const imgElement = document.getElementById(`img-${index}`);
//       const iconElement = favoriteIcon.querySelector("i");

//       if (favorites.includes(hit.webformatURL)) {
//         iconElement.classList.remove("far");
//         iconElement.classList.add("fas");
//       }

//       favoriteIcon.addEventListener("click", () =>
//         toggleFavorite(hit, iconElement)
//       );
//       imgElement.addEventListener("click", () => openModal(hit));
//     });

//     if (data.totalHits > page * 20) {
//       const loadMoreBtn = document.getElementById("loadMoreBtn");
//       loadMoreBtn.hidden = false;
//     } else {
//       const loadMoreBtn = document.getElementById("loadMoreBtn");
//       loadMoreBtn.hidden = true;
//     }
//   }
// }