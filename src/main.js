import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const apiKey = '46100469-a9a71a6d23d5188e64cb63582'; // Замініть на ваш ключ
const lightbox = new SimpleLightbox('.gallery a');
const loader = document.querySelector('.loader');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const searchInput = document.querySelector('input[name="search"]').value;
  gallery.innerHTML = ''; // Очистити галерею перед новим пошуком

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
        loader.style.display = 'block';
        const totalImages = hits.length;
        let loadedImages = 0; // Кількість завантажених зображень

        hits.forEach(hit => {
          const galleryItem = document.createElement('li');
          galleryItem.classList.add('gallery-item');
          galleryItem.innerHTML = `
            <a href="${hit.largeImageURL}">
              <img src="${hit.webformatURL}" alt="${hit.tags}" class="gallery-image">
            </a>
          `;
          gallery.appendChild(galleryItem);

          // Оновлення прогресу завантаження після завантаження кожного зображення
          const image = galleryItem.querySelector('.gallery-image');
          image.onload = () => {
            loadedImages++;
            if (loadedImages === totalImages) {
              loader.style.display = 'none'; // Приховати завантажувач після завантаження всіх зображень
            }
          };
        });

        lightbox.refresh(); // Оновити SimpleLightbox
      }
    })
    .catch(error => {
      console.error(error); // Вивести помилку в консоль для відлагодження
      iziToast.show({
        title: 'Error',
        message: 'Error - while loading images. Please open new images',
        color: 'red',
        position: 'topCenter',
      });
    });
});
