// Diccionari global d'usuaris amb un usuari predefinit
const users = {
  "usuariInicial": {    // Ara utilitzarem el nom d'usuari com a clau
    password: "contrasenya123",
    username: "usuariInicial",  // Afegim el nom d'usuari explícitament
    email: "inicial@example.com"
  }
};

// Inici de sessió
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  if(users[username] && users[username].password === password) {
    loginMessage.style.color = "green";
    loginMessage.textContent = "Login correcte!";
  } else {
    loginMessage.style.color = "red";
    loginMessage.textContent = "Usuari o contrasenya incorrectes.";
  }
});

// Registre d'usuari
const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

registerForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("registerUsername").value;
  const email = document.getElementById("registerEmail").value;
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

  // Al registre, desem l'usuari amb les seves dades
  users[username] = {
    password: password,
    username: username,  // Afegim el nom d'usuari
    email: email
  };

  registerMessage.style.color = "green";
  registerMessage.textContent = "Usuari registrat correctament!";

  registerForm.reset();
});
