

// import { fetchImageDetails } from "./api.js";

// async function ImageInfo(hit) {
//   const modalContent = document.getElementById("modal-item-details");
//   const detailedInfo = await fetchImageDetails(hit.id);

//   modalContent.innerHTML = `
//     <p>Image URL: <a href="${hit.pageURL}" target="_blank">${hit.pageURL}</a></p>
//     <p>Image tags: ${hit.tags}</p>
//     <p>Views: ${hit.views}</p>
//     <p>Comments: ${hit.comments}</p>
//     <p>Likes: ${hit.likes}</p>
//     <p>User: ${hit.user}</p>
//   `;
// }

// export { ImageInfo };

// function openModal(imageInfo) {
//     const modal = document.getElementById("modal");
  
//     modal.style.display = "block";
  
//     window.addEventListener("click", (event) => {
//       if (event.target == modal) {
//         closeModal(modal);
//       }
//     });
//   }
  
//   function closeModal(modal) {
//     modal.style.display = "none";
//   }
  
//   const imageResults = document.getElementById("imageResults");
  
//   imageResults.addEventListener("click", (event) => {
//     const targetImage = event.target.closest("img");
//     if (targetImage) {
//       console.log("Dataset info:", targetImage.dataset.info);
//     }
//   });