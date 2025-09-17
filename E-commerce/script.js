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