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

let songImg = [];

let newMusic = JSON.parse(localStorage.getItem('NewMusic') || "[]");

function saveProducts() {
  localStorage.setItem('NewMusic', JSON.stringify(newMusic));
}

function addMusic() {
  const form = document.getElementById('product_form')
  if (!form) {
    return
  }

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

    if (!pname || !aname || !genre || !date || !price || !song_image) {
      alertTxt.textContent = 'All Fields are required';
      alertElement.style.display = 'block';
      alertBg.style.backgroundColor = "#991b1b";
      setTimeout(() => {
        alertElement.style.display = 'none';
      }, 3000);
      return;
    }

    newMusic.push({
      pname,
      aname,
      genre,
      date,
      price,
      song_image
    })
    alertTxt.textContent = 'Song added successfully';
    alertElement.style.display = 'block';
    alertBg.style.backgroundColor = '#15803d';
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
  if (!tableBody) {
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
          <button
              class="text-blue-600 hover:text-blue-800 font-semibold mr-2 cursor-pointer">Edit</button>
          <button class="text-red-600 hover:text-red-800 font-semibold cursor-pointer">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  })

}