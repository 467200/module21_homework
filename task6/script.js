const pageInput = document.getElementById('pageInput');
const limitInput = document.getElementById('limitInput');
const fetchBtn = document.getElementById('fetchBtn');
const errorMsg = document.getElementById('errorMsg');
const imageContainer = document.getElementById('imageContainer');


window.addEventListener('load', () => {
  const savedImages = localStorage.getItem('lastImages');
  if (savedImages) {
    displayImages(JSON.parse(savedImages));
  }
});

fetchBtn.addEventListener('click', () => {
  const page = parseInt(pageInput.value);
  const limit = parseInt(limitInput.value);

  let error = '';
  const isPageValid = !isNaN(page) && page >= 1 && page <= 10;
  const isLimitValid = !isNaN(limit) && limit >= 1 && limit <= 10;

  if (!isPageValid && !isLimitValid) {
    error = 'Номер страницы и лимит вне диапазона от 1 до 10';
  } else if (!isPageValid) {
    error = 'Номер страницы вне диапазона от 1 до 10';
  } else if (!isLimitValid) {
    error = 'Лимит вне диапазона от 1 до 10';
  }

  if (error) {
    errorMsg.textContent = error;
    imageContainer.innerHTML = '';
    return;
  }

  const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      errorMsg.textContent = '';
      displayImages(data);
      localStorage.setItem('lastImages', JSON.stringify(data));
    })
    .catch(() => {
      errorMsg.textContent = 'Произошла ошибка при получении данных';
    });
});

function displayImages(images) {
  imageContainer.innerHTML = '';
  images.forEach(img => {
    const image = document.createElement('img');
    image.src = img.download_url;
    image.alt = img.author;
    imageContainer.appendChild(image);
  });
}
