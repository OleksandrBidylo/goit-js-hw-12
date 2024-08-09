import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, renderError } from './js/render-functions.js';

const searchForm = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  const query = event.target.elements.searchQuery.value.trim();

  if (!query) {
    renderError('Please enter a search query.');
    return;
  }

  galleryContainer.innerHTML = '';

  try {
    const data = await fetchImages(query);

    if (data.hits.length === 0) {
      renderError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    } else {
      renderGallery(data.hits);
    }
  } catch (error) {
    renderError('Failed to fetch images. Please try again later.');
  }
});
