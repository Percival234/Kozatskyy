const button = document.querySelector('.change-button');
const wrapper = document.querySelector('.wrapper');
const imageButton = document.querySelectorAll('.menu__point-button');
const images = document.querySelectorAll('.menu__point-image-container');

button.addEventListener('click', () => {
  wrapper.classList.toggle('active');
});

imageButton.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    btn.textContent = btn.textContent === 'Відкрити фото' ? 'Закрити фото' : 'Відкрити фото';
    btn.classList.toggle('active');
    images[index].classList.toggle('active');
  });
});
