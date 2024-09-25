'use strict';

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import { images } from './images-data.js';

// const galleryElem = document.querySelector('.gallery');
// galleryElem.style.listStyleType = 'none';

// // Деструктурізація
// for (const img of images) {
//   const { preview, original, description } = img;

//   // створення елемента <img>
//   const imgEl = document.createElement('img');
//   imgEl.classList = 'gallery-image';
//   imgEl.width = '360';
//   imgEl.src = preview;
//   imgEl.alt = description;

//   // створення елемента <a>
//   const linkEl = document.createElement('a');
//   linkEl.classList = 'gallery-link';
//   linkEl.href = original;
//   // linkEl.dataset.src = original;
//   linkEl.title = description;

//   // створення елемента <li>
//   const itemEl = document.createElement('li');
//   itemEl.classList = 'gallery-item';

//   // вкладення елементів (перший той у який вкладаємо, тоді той що вкладаємо)
//   linkEl.appendChild(imgEl);
//   itemEl.appendChild(linkEl);
//   galleryElem.appendChild(itemEl);
// }
// const lightbox = new SimpleLightbox('.gallery a', {
//   captionDelay: 250,
//   captionsData: 'alt',
//   showCounter: false,
// });
