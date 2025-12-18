// Datos de ejemplo con más campos (km, year, transmision, color, puertas, potencia)
const vehicles = [
  { id:1, title:"Mercedes Clase GLC 300 e 4MATIC (2021)", km:94183, fuel:"Híbrido enchufable", price:50900, type:"suv", year:2021, transmision:"automatica", color:"negro", puertas:5, potencia:258 },
  { id:2, title:"Kia Sorento 1.6 T-GDi HEV (2021)", km:105862, fuel:"Híbrido", price:34900, type:"suv", year:2021, transmision:"automatica", color:"blanco", puertas:5, potencia:230 },
  { id:3, title:"Seat Leon SP 2.0 TDI (2021)", km:114550, fuel:"Diésel", price:17900, type:"familiar", year:2021, transmision:"manual", color:"rojo", puertas:5, potencia:150 },
  { id:4, title:"Hyundai Kona HEV (2021)", km:69000, fuel:"Híbrido", price:18900, type:"utilitario", year:2021, transmision:"automatica", color:"azul", puertas:5, potencia:120 },
  { id:5, title:"Range Rover Sport PHEV (2019)", km:81100, fuel:"Híbrido enchufable", price:45900, type:"todoterreno", year:2019, transmision:"automatica", color:"gris", puertas:5, potencia:404 },
  { id:6, title:"Kia Sportage MHEV (2022)", km:99930, fuel:"Híbrido", price:27900, type:"suv", year:2022, transmision:"manual", color:"blanco", puertas:5, potencia:180 },
  { id:7, title:"Renault Arkana E-TECH (2022)", km:113000, fuel:"Híbrido", price:22900, type:"berlina", year:2022, transmision:"automatica", color:"negro", puertas:5, potencia:145 },
  { id:8, title:"Hyundai IONIQ HEV (2022)", km:87434, fuel:"Híbrido", price:19900, type:"berlina", year:2022, transmision:"manual", color:"gris", puertas:5, potencia:141 },
  { id:9, title:"Hyundai IONIQ HEV (2022)", km:87434, fuel:"Híbrido", price:19900, type:"berlina", year:2022, transmision:"manual", color:"gris", puertas:5, potencia:141 }
];

// DOM elements
const cardsGrid = document.getElementById('cardsGrid');
const precioRange = document.getElementById('precio');
const precioVal = document.getElementById('precioVal');
const aplicarBtn = document.getElementById('aplicarBtn');
const searchInput = document.getElementById('searchInput');
const marcaSelect = document.getElementById('marca');
const combustibleSelect = document.getElementById('combustible');
const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');
const tipoCards = document.querySelectorAll('.tipos-coche .mini-card');

// Nuevos filtros
const anioInput = document.getElementById('anio');
const kmInput = document.getElementById('km');
const tipoSelect = document.getElementById('tipo');
const transmisionSelect = document.getElementById('transmision');
const colorSelect = document.getElementById('color');
const puertasSelect = document.getElementById('puertas');
const potenciaInput = document.getElementById('potencia');
const ordenarSelect = document.getElementById('ordenar');

// Mostrar valor rango precio
function formatEuro(n){ return new Intl.NumberFormat('es-ES').format(n) + ' €'; }
precioVal.textContent = formatEuro(precioRange.value);
precioRange.addEventListener('input', () => {
  precioVal.textContent = formatEuro(precioRange.value);
});

// Renderizado de vehículos
function renderVehicles(list){
  cardsGrid.innerHTML = '';
  if(list.length === 0){
    cardsGrid.innerHTML = '<p>No se han encontrado vehículos.</p>';
    return;
  }
  list.forEach((v,i) => {
    const div = document.createElement('article');
    div.className = 'card';
    div.style.animationDelay = `${i * 0.1}s`; // animación escalonada
    div.innerHTML = `
      <div class="thumb">IMG</div>
      <h3>${v.title}</h3>
      <p>${v.km.toLocaleString()} km · ${v.fuel} · ${v.year} · ${v.transmision}</p>
      <p>Color: ${v.color} · Puertas: ${v.puertas} · ${v.potencia} CV</p>
      <div class="price">${formatEuro(v.price)}</div>
    `;
    cardsGrid.appendChild(div);
  });
}

// Filtrado
function filterVehicles(){
  const maxPrice = Number(precioRange.value);
  const q = searchInput.value.trim().toLowerCase();
  const marca = (marcaSelect.value || '').toLowerCase();
  const combustible = (combustibleSelect.value || '').toLowerCase();
  const anio = Number(anioInput.value) || 0;
  const kmMax = Number(kmInput.value) || Infinity;
  const tipo = (tipoSelect.value || '').toLowerCase();
  const transmision = (transmisionSelect.value || '').toLowerCase();
  const color = (colorSelect.value || '').toLowerCase();
  const puertas = Number(puertasSelect.value) || 0;
  const potenciaMin = Number(potenciaInput.value) || 0;
  const ordenar = ordenarSelect.value;

  let filtered = vehicles.filter(v => {
    if(v.price > maxPrice) return false;
    if(q && !(v.title.toLowerCase().includes(q))) return false;
    if(marca && !v.title.toLowerCase().includes(marca)) return false;
    if(combustible && !v.fuel.toLowerCase().includes(combustible)) return false;
    if(anio && v.year < anio) return false;
    if(v.km > kmMax) return false;
    if(tipo && v.type !== tipo) return false;
    if(transmision && v.transmision !== transmision) return false;
    if(color && v.color !== color) return false;
    if(puertas && v.puertas !== puertas) return false;
    if(potenciaMin && v.potencia < potenciaMin) return false;
    return true;
  });

  // Ordenar resultados
  if(ordenar){
    filtered.sort((a,b) => {
      switch(ordenar){
        case "precioAsc": return a.price - b.price;
        case "precioDesc": return b.price - a.price;
        case "kmAsc": return a.km - b.km;
        case "kmDesc": return b.km - a.km;
        case "anioAsc": return a.year - b.year;
        case "anioDesc": return b.year - a.year;
        default: return 0;
      }
    });
  }

  renderVehicles(filtered);
}

// Eventos de búsqueda
aplicarBtn.addEventListener('click', filterVehicles);
searchInput.addEventListener('input', filterVehicles);

// Menú móvil
menuBtn.addEventListener('click', () => {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('show');
});

// Clic en tarjetas de tipo
tipoCards.forEach(card => {
  card.addEventListener('click', () => {
    const type = card.dataset.type;
    const filtered = vehicles.filter(v => v.type === type);
    renderVehicles(filtered);
    window.location.hash = "vehiculos";
  });
});

let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
const favCount = document.getElementById('favCount');

// contador favoritos en nav
function updateFavCount(){
  if(favCount) favCount.textContent = favoritos.length;
}

// añadir/quitar favoritos
function toggleFavorito(id){
  const vehiculo = vehicles.find(v => v.id === id);
  const index = favoritos.findIndex(f => f.id === id);
  if(index >= 0){
    favoritos.splice(index,1);
  } else {
    favoritos.push(vehiculo);
  }
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  updateFavCount();
  renderVehicles(vehicles); // refrescar para actualizar iconos
}

// render con icono de favorito
function renderVehicles(list){
  cardsGrid.innerHTML = '';
  if(list.length === 0){
    cardsGrid.innerHTML = '<p>No se han encontrado vehículos.</p>';
    return;
  }
  list.forEach((v,i) => {
    const div = document.createElement('article');
    div.className = 'card';
    div.style.animationDelay = `${i * 0.1}s`;
    const isFav = favoritos.some(f => f.id === v.id);

    div.innerHTML = `
      <button class="favorite-btn ${isFav ? "active" : ""}" data-id="${v.id}">
        ${isFav ? "❤️" : "🤍"}
      </button>
      <div class="thumb">IMG</div>
      <h3>${v.title}</h3>
      <p>${v.km.toLocaleString()} km · ${v.fuel} · ${v.year} · ${v.transmision}</p>
      <p>Color: ${v.color} · Puertas: ${v.puertas} · ${v.potencia} CV</p>
      <div class="price">${formatEuro(v.price)}</div>
    `;
    cardsGrid.appendChild(div);
  });

  // eventos favoritos
  document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorito(Number(btn.dataset.id));
    });
  });
}

// al iniciar
updateFavCount();
renderVehicles(vehicles);

