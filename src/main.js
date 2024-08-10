import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, renderError } from './js/render-functions.js';

const searchForm = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('#load-more');

let query = '';
let page = 1;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  query = event.target.elements.searchQuery.value.trim();

  if (!query) {
    renderError('Please enter a search query.');
    return;
  }

  galleryContainer.innerHTML = '';
  page = 1;
  loadMoreButton.classList.add('hidden');

  try {
    const data = await fetchImages(query, page);

    if (data.hits.length === 0) {
      renderError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    } else {
      renderGallery(data.hits);
      loadMoreButton.classList.remove('hidden');
    }
  } catch (error) {
    renderError('Failed to fetch images. Please try again later.');
  }
});

loadMoreButton.addEventListener('click', async () => {
  page += 1;

  try {
    const data = await fetchImages(query, page);

    if (data.hits.length === 0 || page * 15 >= data.totalHits) {
      loadMoreButton.classList.add('hidden');
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      renderGallery(data.hits, true);

      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    renderError('Failed to fetch images. Please try again later.');
  }
});
