import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, renderError } from './js/render-functions.js';

const searchForm = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('#load-more');
const loader = document.querySelector('#loader');
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
  loadMoreButton.style.display = 'none';
  loader.style.display = 'block';

  try {
    const data = await fetchImages(query, page);

    if (data.hits.length === 0) {
      renderError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      loadMoreButton.style.display = 'none';
    } else {
      renderGallery(data.hits);

      if (data.hits.length < 15 || page * 15 >= data.totalHits) {
        loadMoreButton.style.display = 'none';
      } else {
        loadMoreButton.style.display = 'flex';
      }
    }
  } catch (error) {
    renderError('Failed to fetch images. Please try again later.');
    loadMoreButton.style.display = 'none';
  } finally {
    loader.style.display = 'none';
  }
});

loadMoreButton.addEventListener('click', async () => {
  page += 1;
  loader.style.display = 'block';

  try {
    const data = await fetchImages(query, page);

    if (data.hits.length === 0 || page * 15 >= data.totalHits) {
      loadMoreButton.style.display = 'none';
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
  } finally {
    loader.style.display = 'none';
  }
});
