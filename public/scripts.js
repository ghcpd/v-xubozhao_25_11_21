const menuButton = document.getElementById('menuButton');
const mobileNav = document.getElementById('mobileNav');

if (menuButton && mobileNav) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    mobileNav.classList.toggle('hidden');
  });
}

const filterButtons = document.querySelectorAll('.filter-button');
const alertCards = document.querySelectorAll('.alert-card');

const setFilter = (filterValue) => {
  filterButtons.forEach((btn) => {
    const isActive = btn.dataset.filter === filterValue;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });

  alertCards.forEach((card) => {
    const matches = filterValue === 'all' || card.dataset.severity === filterValue;
    card.style.display = matches ? 'flex' : 'none';
  });
};

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    setFilter(btn.dataset.filter);
  });
});

// Initialize default filter for progressive enhancement
setFilter('all');
