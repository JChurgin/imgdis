const API_KEY = "38037221-2273b01c62481dfc7f61a369c";
const URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo`;

async function fetchImages(query) {
  const response = await fetch(`${URL}&q=${query}`);
  const data = await response.json();
  console.log("API Response:", data);

  const modifiedHits = data.hits.map((hit) => ({
    ...hit,
    imageURL: hit.webformatURL,
    imageTags: hit.tags,
    views: hit.views,
    comments: hit.comments,
    likes: hit.likes,
    user: hit.user,
  }));

  return modifiedHits;
}

export { fetchImages };
