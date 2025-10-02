// Diccionari global d'usuaris amb un usuari predefinit
const users = {
  "usuariInicial": {
    password: "contrasenya123",
    username: "usuariInicial",
    email: "inicial@example.com"
  }
};

// Selecció d'elements del DOM
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

/**
 * Mostra un missatge a l'element especificat.
 * @param {HTMLElement} element - L'element on mostrar el missatge.
 * @param {string} text - El text del missatge.
 * @param {boolean} isSuccess - True si és un missatge d'èxit, false si és d'error.
 */
function showMessage(element, text, isSuccess) {
  element.textContent = text;
  element.classList.remove('success', 'error');
  element.classList.add(isSuccess ? 'success' : 'error');
}

// Gestor de l'inici de sessió
loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  if (users[username] && users[username].password === password) {
    showMessage(loginMessage, "Login correcte!", true);
  } else {
    showMessage(loginMessage, "Usuari o contrasenya incorrectes.", false);
  }
});

// Gestor del registre d'usuari
registerForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("registerUsername").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("registerConfirmPassword").value;

  if (password !== confirmPassword) {
    showMessage(registerMessage, "Les contrasenyes no coincideixen.", false);
    return;
  }

  if (users[username]) {
    showMessage(registerMessage, "Aquest usuari ja existeix.", false);
    return;
  }

  users[username] = { password, username, email };
  showMessage(registerMessage, "Usuari registrat correctament!", true);
  registerForm.reset();
});


// Efecte Parallax optimitzat
const animatedElements = {
  background: document.querySelector('body::before'),
  forms: document.querySelectorAll('form')
};
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX - window.innerWidth / 2) * 0.005;
  mouseY = (e.clientY - window.innerHeight / 2) * 0.005;
});

function animate() {
  if (animatedElements.background) {
      animatedElements.background.style.transform = `translate(${mouseX * -2}px, ${mouseY * -2}px)`;
  }
  animatedElements.forms.forEach(form => {
    form.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });
  requestAnimationFrame(animate);
}

// Inicia l'animació només si l'usuari no prefereix moviment reduït
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    requestAnimationFrame(animate);
}
