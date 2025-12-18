let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
const favoritosGrid = document.getElementById('favoritosGrid');
const favCount = document.getElementById('favCount');

function updateFavCount(){ if(favCount) favCount.textContent = favoritos.length; }
function formatEuro(n){ return new Intl.NumberFormat('es-ES').format(n) + ' €'; }

function renderFavoritos(){
  favoritosGrid.innerHTML = '';
  if(favoritos.length === 0){
    favoritosGrid.innerHTML = '<p style="grid-column:1/-1; font-size:1rem; color:#555;">No has guardado ningún vehículo en favoritos.</p>';
    return;
  }
  favoritos.forEach(v => {
    const div = document.createElement('article');
    div.className = 'card';
    div.innerHTML = `
      <button class="favorite-btn active" data-id="${v.id}">❤️</button>
      <div class="thumb" style="background-image:url('${v.img || "https://via.placeholder.com/400x250?text=Vehículo"}')"></div>
      <h3>${v.title}</h3>
      <p>${v.km.toLocaleString()} km · ${v.fuel} · ${v.year} · ${v.transmision}</p>
      <p>Color: ${v.color} · Puertas: ${v.puertas} · ${v.potencia} CV</p>
      <div class="price">${formatEuro(v.price)}</div>
    `;
    favoritosGrid.appendChild(div);
  });

  // Animación al quitar
  document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const card = btn.closest('.card');
      card.style.transition = "opacity .3s ease, transform .3s ease";
      card.style.opacity = "0";
      card.style.transform = "scale(.9)";
      setTimeout(() => {
        favoritos = favoritos.filter(f => f.id !== id);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        renderFavoritos();
        updateFavCount();
      }, 300);
    });
  });
}

updateFavCount();
renderFavoritos();
