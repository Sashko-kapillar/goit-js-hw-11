import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
// import { pixabay } from './js/pixabay-api';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const apiKey = '46100469-a9a71a6d23d5188e64cb63582'; // Замініть на ваш ключ
const lightbox = new SimpleLightbox('.gallery a');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const searchInput = document.querySelector('input[name="search"]').value;

  gallery.innerHTML = ''; //Очистити галерею перед новим пошуком
  localStorage.removeItem('search-form-state');

  axios
    .get(
      `https://pixabay.com/api/?key=${apiKey}&q=${searchInput}&image_type=photo&orientation=horizontal&safesearch=true`
    )
    .then(response => {
      const hits = response.data.hits;

      if (hits.length === 0) {
        iziToast.show({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          color: 'red',
          position: 'topCenter',
        });
      } else {
        hits.forEach(hit => {
          const galleryItem = document.createElement('li');
          galleryItem.classList.add('gallery-item');
          galleryItem.innerHTML = `
                        <a href="${hit.largeImageURL}">
                            <img src="${hit.webformatURL}" alt="${hit.tags}" class="gallery-image">
                        </a>
                    `;
          gallery.appendChild(galleryItem);
        });

        lightbox.refresh(); // для оновлення SimpleLightbox
      }

      // Приховати завантажувач (після завершення завантаження)
      loader.style.display = 'none';
    })
    .catch(error => {
      // console.error(error);
      if ((error = false)) {
        iziToast.show({
          title: 'Error',
          message: 'Error - while loading images. Please open new images',
          color: 'red',
          position: 'topCenter',
        });
      }
    });
});
