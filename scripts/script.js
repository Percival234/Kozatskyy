function parseTsv(tsv) {
  const rows = tsv.split('\n');
  const data = [];

  rows.forEach((row, index) => {
    if (index === 0) return;

    const columns = row.split('\t');

    if (columns.length >= 7) {
      const item = {
        id: columns[0].trim(),
        category: columns[1].trim(),
        name: columns[2].trim(),
        description: columns[3].trim(),
        weight: columns[4].trim(),
        price: columns[5].trim(),
        image: columns[6].trim(),
      };

      data.push(item);
    }
  });
  console.log(data);
  return data;
}

function menuPoint(point) {
  const { name, weight, price, description, image } = point;
  const correctImageSrc = image ? image.slice(-50, -17) : false;
  // ('https://drive.google.com/uc?export=view&id=1Jpm3-HwlutqMhwI779esWOdi1DHfttM0');
  return `
  <div class="point">
    <div class="point__content">
      <h4>${name}</h4>
      <div class="point__info">${weight || ''}</div>
      <div class="point__info">${price || 0} грн</div>
    </div>
    ${description ? `<p>${description}</p>` : ''}
    ${
      image
        ? `<button type="button" class="point__button">відкрити фото</button>
          <div class="point__image-container loading">
            <img class="point__image" src="https://drive.google.com/uc?export=view&id=${correctImageSrc}" alt="${name}"/>
          </div>`
        : ''
    }
  </div>`;
}

function menuSection(category, list) {
  const points = list
    .filter((point) => point.category === category)
    .map((el) => menuPoint(el))
    .join('');
  return `
  <section>
    <div class="container">
      <h3 class="section-title">${category}</h3>
      <div class="list">
        ${points}
      </div>
    </div>
  </section>`;
}

function menuRender(data) {
  const categories = [...new Set(data.map((point) => point.category))];
  const menuSections = document.getElementById('menu-sections');
  const menu = document.getElementById('menu');
  const loader = document.getElementById('loader');

  categories.forEach((category) => {
    menuSections.insertAdjacentHTML('beforebegin', menuSection(category, data));
  });

  loader.remove();
  menu.classList.remove('hidden');
}

function setImagesEvent() {
  const imageButton = document.querySelectorAll('.point__button');
  const imagesContainers = document.querySelectorAll('.point__image-container');

  imageButton.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      btn.textContent = btn.textContent === 'відкрити фото' ? 'закрити фото' : 'відкрити фото';
      btn.classList.toggle('active');
      imagesContainers[index].classList.toggle('active');
    });
  });
}

async function getFood() {
  try {
    const response = await fetch(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vTvnsxtDSCcAO_G173QMHHpNKy0Mkw2I_YL2IcWtRxdO82LNScFiRZTC6aGNShCyWzoIEBl0f70TVpL/pub?output=tsv'
    );
    const data = await response.text();
    const parsedData = parseTsv(data);
    menuRender(parsedData);
    setImagesEvent();
  } catch (error) {
    console.log(error);
    const wrapper = document.getElementById('wrapper');
    wrapper.innerHTML = '<div class="error">Перезавантажте сторінку!</div>';
  }
}
getFood();
