const loginForm = document.getElementById('loginForm');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginMsg = document.getElementById('loginMsg');
const loginStrength = document.getElementById('loginStrength');

// Mostrar/ocultar contraseña
const toggleLoginPass = document.getElementById('toggleLoginPass');
toggleLoginPass.addEventListener('click', ()=>{
  loginPassword.type = loginPassword.type === 'password' ? 'text' : 'password';
  toggleLoginPass.textContent = loginPassword.type === 'text' ? '🙈' : '👁️';
});

// Validación email
function validateEmail(value){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Fuerza de contraseña
function passwordStrength(pwd){
  let score = 0;
  if(pwd.length >= 6) score++;
  if(/[A-Z]/.test(pwd)) score++;
  if(/[0-9]/.test(pwd)) score++;
  if(/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}

function updateStrengthMeter(pwd, meter){
  meter.classList.remove('weak','fair','good','strong');
  if(pwd.length === 0) return;
  const s = passwordStrength(pwd);
  if(s <= 1) meter.classList.add('weak');
  else if(s === 2) meter.classList.add('fair');
  else if(s === 3) meter.classList.add('good');
  else meter.classList.add('strong');
}

// Indicador fuerza
loginPassword.addEventListener('input', e=>{
  updateStrengthMeter(e.target.value, loginStrength);
});

// Validación al enviar
loginForm.addEventListener('submit', e=>{
  e.preventDefault();
  loginMsg.classList.add('hidden');

  if(!validateEmail(loginEmail.value)){
    alert('Correo inválido');
    return;
  }
  if(loginPassword.value.length < 6){
    alert('Contraseña muy corta');
    return;
  }

  loginMsg.textContent = 'Inicio de sesión correcto ✔';
  loginMsg.classList.remove('hidden');
});
