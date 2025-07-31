const input = document.getElementById('search-input');
const clearBtn = document.getElementById('clearButton');
const suggestionsList = document.getElementById('suggestions');

let places = [];
let shops = [];

// Fetch places and shops from server
fetch('places')
  .then(res => res.json())
  .then(data => {
    places = data.places || [];
    shops = data.shops || [];
  });

input.addEventListener('input', () => {
  const query = input.value.trim().toLowerCase();
  clearBtn.style.display = query ? 'block' : 'none';

  if (!query) {
    suggestionsList.style.display = 'none';
    suggestionsList.innerHTML = '';
    return;
  }

  // Merge and search both places and shops
  const allItems = [
  ...places.map(p => ({ ...p, type: '📌 ' })),
  ...shops.map(s => ({ ...s, type: '☕ ' }))
];

  const filtered = allItems
    .map(item => ({
      ...item,
      similarity: stringSimilarity(query, item.name.toLowerCase())
    }))
    .filter(i => i.similarity > 0.2)
    .sort((a, b) => b.similarity - a.similarity);

  // Render suggestions
  suggestionsList.innerHTML = '';
  filtered.forEach(item => {
    const li = document.createElement('li');
    const type = shops.includes(item) ? 'shop' : 'place';
	li.innerHTML = `<span class="type-label">${item.type}</span> ${item.name}`;
    li.title = item.description;
    li.addEventListener('click', () => {
      input.value = item.name;
      suggestionsList.innerHTML = '';
      suggestionsList.style.display = 'none';
      map.setView([item.lat, item.lng], 15); // Zoom to item on map
    });
    suggestionsList.appendChild(li);
  });

  suggestionsList.style.display = filtered.length ? 'block' : 'none';
});

clearBtn.addEventListener('click', () => {
  input.value = '';
  input.focus();
  suggestionsList.innerHTML = '';
  suggestionsList.style.display = 'none';
  clearBtn.style.display = 'none';
});

// Simple similarity scoring
function stringSimilarity(a, b) {
  const common = a.split('').filter(char => b.includes(char)).length;
  return common / Math.max(a.length, b.length);
}
