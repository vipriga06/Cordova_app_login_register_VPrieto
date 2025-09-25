// Cargar usuarios de localStorage o usar el inicial
let users = JSON.parse(localStorage.getItem('users')) || {
  "usuariInicial": "contrasenya123"
};

// Guardar cambios en localStorage
function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}

// Login
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  if(users[username] && users[username] === password) {
    loginMessage.style.color = "green";
    loginMessage.textContent = "Login correcte!";
  } else {
    loginMessage.style.color = "red";
    loginMessage.textContent = "Usuari o contrasenya incorrectes.";
  }
});

// Registre
const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

registerForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("registerConfirmPassword").value;

  if(password !== confirmPassword) {
    registerMessage.style.color = "red";
    registerMessage.textContent = "Les contrasenyes no coincideixen.";
    return;
  }

  if(users[username]) {
    registerMessage.style.color = "red";
    registerMessage.textContent = "Aquest usuari ja existeix.";
    return;
  }

  users[username] = password;
  saveUsers(); // guardamos en localStorage

  registerMessage.style.color = "green";
  registerMessage.textContent = "Usuari registrat correctament!";

  registerForm.reset();
});
