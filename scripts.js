const API_KEY = "38037221-2273b01c62481dfc7f61a369c";
const API_URL = "https://pixabay.com/api/?key=" + API_KEY;

document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const userSearch = document.getElementById("searchInput").value;

    const searchUrl = API_URL + "&q=" + encodeURIComponent(userSearch);

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
