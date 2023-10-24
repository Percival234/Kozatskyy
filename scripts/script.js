function setImagesEvent() {
  const imageButton = document.querySelectorAll('.point__button');
  const images = document.querySelectorAll('.point__image-container');

  imageButton.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      btn.textContent = btn.textContent === 'відкрити фото' ? 'закрити фото' : 'відкрити фото';
      btn.classList.toggle('active');
      images[index].classList.toggle('active');
    });
  });
}

function parseTsv(tsv) {
  console.log(tsv);
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
  return `
  <div class="point">
    <div class="point__content">
      <h4>${point.name}</h4>
      <div class="point__info">${point.weight || ''}</div>
      <div class="point__info">${point.price || 0} грн</div>
    </div>
    ${point.description ? `<p>${point.description}</p>` : ''}
    ${
      point.image
        ? `<button type="button" class="point__button">відкрити фото</button>
          <div class="point__image-container">
            <img class="point__image" src="${point.image}"  alt="meal" />
          </div>`
        : ''
    }
  </div>`;
}

// https://drive.google.com/file/d/177xPDNN3A8h5oPs8vygfccRgPowfdKX_/view?usp=sharing посилання коли жмеш поділитись
// https://drive.google.com/file/d/177xPDNN3A8h5oPs8vygfccRgPowfdKX_/view?usp=drive_link посилання на картнку не відкриту

function menuSection(category, list) {
  const points = [];
  const categoryPoints = list.filter((point) => point.category === category);
  for (const point of categoryPoints) {
    points.push(menuPoint(point));
  }
  return `
  <section>
    <div class="container">
      <h3 class="section-title">${category}</h3>
      <div class="list">
        ${points.join('')}
      </div>
    </div>
  </section>`;
}

function menuRender(data) {
  const menu = document.getElementById('menu');
  const categories = [...new Set(data.map((point) => point.category))];
  for (const category of categories) {
    menu.innerHTML += menuSection(category, data);
  }
}

async function getFood() {
  try {
    const response = await fetch(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vTvnsxtDSCcAO_G173QMHHpNKy0Mkw2I_YL2IcWtRxdO82LNScFiRZTC6aGNShCyWzoIEBl0f70TVpL/pub?output=tsv'
    );
    const data = await response.text();
    const parsedData = parseTsv(data);
    document.getElementById('loader').remove();
    menuRender(parsedData);
    setImagesEvent();
  } catch (error) {
    document.getElementById('wrapper').innerHTML =
      '<div class="error">Перезавантажте сторінку!</div>';
  }
}
getFood();
