let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

// Відстеження змін у формі та збереження даних в локальному сховищі
form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

// Завантаження даних з локального сховища при завантаженні сторінки
const storedData = localStorage.getItem('feedback-form-state');
console.log(storedData);

if (storedData) {
  const parsedData = JSON.parse(storedData);
  console.log(parsedData);
  formData = parsedData;
  form.elements.email.value = parsedData.email;
  form.elements.message.value = parsedData.message;
}

// Обробка відправки форми
form.addEventListener('submit', event => {
  event.preventDefault();

  // Валідація даних
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  // Очищення даних
  localStorage.removeItem('feedback-form-state');
  formData.email = '';
  formData.message = '';
  form.reset();
});
