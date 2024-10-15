let debounceTimeout;
const resultsDiv = document.getElementById('results');
const loading = document.getElementById('loading');
const paginationDiv = document.getElementById('pagination');

document.getElementById('search').addEventListener('input', function() {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    searchProviders(this.value);
  }, 300); // 300ms debounce
});

document.getElementById('theme-toggle').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
});

async function searchProviders(query, page = 1) {
  loading.style.display = 'block';
  const filterLocation = document.getElementById('filter-location').value;
  const response = await fetch(`/search?query=${query}&page=${page}&location=${filterLocation}`);
  const { providers, totalPages } = await response.json();

  renderResults(providers);
  renderPagination(totalPages, query);
  loading.style.display = 'none';
}

function renderResults(providers) {
  resultsDiv.innerHTML = providers.map(provider => `<div class="provider">${provider}</div>`).join('');
}

function renderPagination(totalPages, query) {
  paginationDiv.innerHTML = ''; // Clear previous pagination

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.addEventListener('click', () => searchProviders(query, i));
    paginationDiv.appendChild(pageButton);
  }
}
