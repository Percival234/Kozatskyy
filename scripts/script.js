const imageButton = document.querySelectorAll('.menu__point-button');
const images = document.querySelectorAll('.menu__point-image-container');

imageButton.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    btn.textContent = btn.textContent === 'Відкрити фото' ? 'Закрити фото' : 'Відкрити фото';
    btn.classList.toggle('active');
    images[index].classList.toggle('active');
  });
});
