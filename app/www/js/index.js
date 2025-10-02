// Diccionari global d'usuaris amb un usuari predefinit
const users = {
  "usuariInicial": {
    password: "contrasenya123",
    username: "usuariInicial",
    email: "inicial@example.com"
  }
};

// Selecció d'elements del DOM (optimitzat)
const formElements = {
  loginForm: document.getElementById("loginForm"),
  loginMessage: document.getElementById("loginMessage"),
  registerForm: document.getElementById("registerForm"),
  registerMessage: document.getElementById("registerMessage"),
  loginUsername: document.getElementById("loginUsername"),
  loginPassword: document.getElementById("loginPassword"),
  registerUsername: document.getElementById("registerUsername"),
  registerEmail: document.getElementById("registerEmail"),
  registerPassword: document.getElementById("registerPassword"),
  registerConfirmPassword: document.getElementById("registerConfirmPassword")
};

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
  element.style.opacity = '1';
  element.style.transform = 'translateY(0)';
}

/**
 * Valida el format d'un email
 * @param {string} email - Email a validar
 * @returns {boolean} True si el format és vàlid
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Valida la contrasenya
 * @param {string} password - Contrasenya a validar
 * @returns {boolean} True si la contrasenya és vàlida
 */
function isValidPassword(password) {
  return password.length >= 6;
}

// Gestor de l'inici de sessió
formElements.loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const username = formElements.loginUsername.value.trim();
  const password = formElements.loginPassword.value;

  if (users[username] && users[username].password === password) {
    showMessage(formElements.loginMessage, "Login correcte!", true);
    // Aquí podries redirigir o fer alguna acció després del login
  } else {
    showMessage(formElements.loginMessage, "Usuari o contrasenya incorrectes.", false);
  }
});

// Gestor del registre d'usuari
formElements.registerForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const username = formElements.registerUsername.value.trim();
  const email = formElements.registerEmail.value.trim();
  const password = formElements.registerPassword.value;
  const confirmPassword = formElements.registerConfirmPassword.value;

  // Validacions
  if (!isValidEmail(email)) {
    showMessage(formElements.registerMessage, "Si us plau, introdueix un email vàlid", false);
    return;
  }

  if (!isValidPassword(password)) {
    showMessage(formElements.registerMessage, "La contrasenya ha de tenir mínim 6 caràcters", false);
    return;
  }

  if (password !== confirmPassword) {
    showMessage(formElements.registerMessage, "Les contrasenyes no coincideixen.", false);
    return;
  }

  if (users[username]) {
    showMessage(formElements.registerMessage, "Aquest usuari ja existeix.", false);
    return;
  }

  // Registre d'usuari
  users[username] = {
    password,
    username,
    email
  };

  showMessage(formElements.registerMessage, "Usuari registrat correctament!", true);
  formElements.registerForm.reset();
});

// Efecte Parallax optimitzat
const animatedElements = {
  background: document.querySelector('body::before'),
  forms: document.querySelectorAll('form')
};

let mouseX = 0;
let mouseY = 0;
let animationFrameId = null;

const handleMove = (e) => {
  const clientX = e.clientX || e.touches?.[0]?.clientX;
  const clientY = e.clientY || e.touches?.[0]?.clientY;

  if (clientX && clientY) {
    mouseX = (clientX - window.innerWidth / 2) * 0.005;
    mouseY = (clientY - window.innerHeight / 2) * 0.005;
  }
};

const animate = () => {
  if (animatedElements.background) {
    animatedElements.background.style.transform = `translate(${mouseX * -2}px, ${mouseY * -2}px)`;
  }

  animatedElements.forms.forEach(form => {
    form.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  animationFrameId = requestAnimationFrame(animate);
};

// Inicia l'animació només si l'usuari no prefereix moviment reduït
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.addEventListener('mousemove', handleMove);
  document.addEventListener('touchmove', handleMove);
  animationFrameId = requestAnimationFrame(animate);
}

// Netejar animació quan es tanqui la pàgina
window.addEventListener('beforeunload', () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
