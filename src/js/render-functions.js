let lightbox;

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = images
    .map(
      image => `
    <a href="${image.largeImageURL}" class="gallery-item" data-caption="${image.tags}">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="g-image">
      <div class="info">
        <p class="i-text"><span class="fat-el">Likes</span> ${image.likes}</p>
        <p class="i-text"><span class="fat-el">Views</span> ${image.views}</p>
        <p class="i-text"><span class="fat-el">Comments</span> ${image.comments}</p>
        <p class="i-text"><span class="fat-el">Downloads</span> ${image.downloads}</p>
      </div>
    </a>
  `
    )
    .join('');

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

export function renderError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
  });
}
