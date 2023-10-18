const button = document.querySelector('.change-button');
const wrapper = document.body;
const bg = document.querySelector('.bg-image');

button.addEventListener('click', () => {
  wrapper.classList.toggle('active');
});

const images = document.querySelectorAll('.menu__point-image-container');

images.forEach((image) => {
  image.addEventListener('click', () => {
    image.style.display = 'none';
  });
});
