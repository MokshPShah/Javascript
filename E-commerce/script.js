const navItems = document.querySelectorAll('.nav-item');
const currentPath = window.location.pathname.split("/").pop(); // get current file name

navItems.forEach(item => {
  const href = item.getAttribute('href');
  if (href === currentPath || (href === 'index.html' && currentPath === '')) {
    item.classList.add('text-rose-600', 'font-semibold');
  } else {
    item.classList.remove('text-white', 'font-semibold');
  }
});

let newMusic = JSON.parse(localStorage.getItem('NewMusic')) || [];

function saveProducts() {
  localStorage.setItem('NewMusic', JSON.stringify(newMusic));
}

function addMusic() {
  const form = document.getElementById('product_form')
  if (!form) return;

  if (form.dataset.listenerAdded) return;
  form.dataset.listenerAdded = true;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const pname = document.getElementById('music_name').value;
    const aname = document.getElementById('artist_name').value;
    const genre = document.getElementById('genre').value;
    const date = document.getElementById('release_date').value;
    const price = document.getElementById('price').value;
    const song_image = document.getElementById('song_image').value;
    const alertElement = document.getElementById('alert');
    const alertTxt = document.getElementById('alertTxt');
    const alertBg = document.getElementById('alertBg');
    const productBtn = document.getElementById('productBtn');

    if (!pname || !aname || !genre || !date || !price || !song_image) {
      alertTxt.textContent = 'All Fields are required';
      alertElement.style.display = 'block';
      alertBg.style.backgroundColor = "#991b1b";
      setTimeout(() => {
        alertElement.style.display = 'none';
      }, 3000);
      return;
    }

    const editIdx = form.getAttribute('data-edit-index');

    if (editIdx !== null && editIdx !== "") {
      newMusic[editIdx] = { pname, aname, genre, date, price, song_image }
      alertTxt.textContent = "Song updated successfully";
      alertBg.style.backgroundColor = "#2563eb"
      alertElement.style.display = "block";
      productBtn.textContent = "Add Song";
      form.removeAttribute('data-edit-index');
    } else {
      newMusic.push({ pname, aname, genre, date, price, song_image })
      alertTxt.textContent = 'Song added successfully';
      alertElement.style.display = 'block';
      alertBg.style.backgroundColor = '#15803d';
    }
    setTimeout(() => {
      alertElement.style.display = 'none';
    }, 3000);

    saveProducts();
    renderTable();
    form.reset();
  })
}

closeAlert = () => {
  const alertElement = document.getElementById('alert');
  alertElement.style.display = 'none';
}

function renderTable() {
  const tableBody = document.getElementById('songTable')
  tableBody.innerHTML = "";
  if (!tableBody) return;

  if (newMusic.length === 0) {
    tableBody.innerHTML = `
      <div class="text-gray-500 text-2xl my-10">
        No Songs to display...
      </div>
    `;
    return;
  }

  newMusic.forEach((song, index) => {
    const row = document.createElement('tr');

    row.innerHTML += `
      <td class="px-6 py-4 text-sm text-gray-700">${index + 1}</td>
      <td class="px-6 py-4">
          <img src="${song.song_image}" alt="${song.pname}"
              class="w-20 h-20 object-cover rounded-md">
      </td>
      <td class="px-6 py-4 text-sm font-medium text-gray-900">${song.pname}</td>
      <td class="px-6 py-4 text-sm text-gray-700">${song.aname}</td>
      <td class="px-6 py-4 text-sm text-gray-700">${song.genre}</td>
      <td class="px-6 py-4 text-sm text-gray-700">${song.date}</td>
      <td class="px-6 py-4 text-sm text-gray-700">${song.price}</td>
      <td class="px-6 py-4 text-sm text-gray-700">
          <button onclick="editMusic(${index})"
              class="text-blue-600 hover:text-blue-800 font-semibold mr-2 cursor-pointer">Edit</button>
          <button class="text-red-600 hover:text-red-800 font-semibold cursor-pointer" onclick="deleteMusic(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  })
}

function renderCards() {
  const cardContainer = document.getElementById("cardContainer");
  if (!cardContainer) return;

  cardContainer.innerHTML = "";

  if (newMusic.length === 0) {
    cardContainer.className = "min-h-screen flex items-center justify-center"
    cardContainer.innerHTML = `
      <div class="text-gray-500 text-2xl my-auto">
        No Songs to display...
      </div>
    `;
    return;
  }

  newMusic.forEach((song) => {
    const card = document.createElement('div');

    card.className = "group bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 overflow-hidden hover:shadow-xl hover:ring-rose-200 transition-all duration-300";
    card.innerHTML = `
      <div class="relative">
        <img src="${song.song_image}" alt="${song.pname}" class="w-full h-auto object-contain transform transition-transform duration-500 group-hover:scale-105">
        <span class="absolute top-3 right-3 bg-rose-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">₹${song.price}</span>
        <span class="absolute bottom-3 left-3 bg-white/90 backdrop-blur text-gray-700 text-xs px-2 py-1 rounded-full border border-gray-200">${song.genre}</span>
      </div>
      <div class="p-4">
        <h2 title="${song.pname}" class="text-base md:text-lg font-semibold text-gray-900 truncate">${song.pname}</h2>
        <p title="${song.aname}" class="text-sm text-gray-600 truncate">${song.aname}</p>
        <div class="mt-2 flex items-center gap-2 text-xs text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 0 0 2-2v-6H3v6a2 2 0 0 0 2 2z"/>
          </svg>
          <span>${song.date}</span>
        </div>
        <button class="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-medium shadow hover:from-rose-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400 transition cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/>
          </svg>
          Add to Cart
        </button>
      </div>
    `;
    cardContainer.appendChild(card);
  });
}

function editMusic(index) {
  const song = newMusic[index];
  const form = document.getElementById('product_form');
  const productBtn = document.getElementById('productBtn');

  document.getElementById('music_name').value = song.pname;
  document.getElementById('artist_name').value = song.aname;
  document.getElementById('genre').value = song.genre;
  document.getElementById('release_date').value = song.date;
  document.getElementById('price').value = song.price;
  document.getElementById('song_image').value = song.song_image;

  form.setAttribute('data-edit-index', index);
  productBtn.textContent = "Update Song";
}

function deleteMusic(index) {
  newMusic.splice(index, 1)
  saveProducts();
  renderTable();
  renderCards();
}