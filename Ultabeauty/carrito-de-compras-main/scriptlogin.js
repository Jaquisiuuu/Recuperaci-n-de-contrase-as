const container = document.getElementById("container");
const registerbtn = document.getElementById("register");
const loginbtn = document.getElementById("login");

// Toggle de formularios
registerbtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginbtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// Usuarios predeterminados con roles
const users = [
  { email: "20635@utsc.com", password: "contraseña123", role: "admin" },
  { email: "jaqui07elote@gmail.com", password: "evento07", role: "user" },
  { email: "jackyycoder@outlook.com", password: "evento08", role: "user" }
];

// Correos válidos para recuperación de cuenta
const registeredEmails = [
  "20635@utsc.com", "jaqui07elote@gmail.com", "jackyycoder@outlook.com"
];

// Obtén los elementos del DOM
const signInForm = document.querySelector(".sign-in form");
const emailInput = signInForm.querySelector("input[type='text']");
const passwordInput = signInForm.querySelector("input[type='password']");
const signInButton = signInForm.querySelector("button");
const errorMessage = document.createElement("p");
const verificationDiv = document.getElementById("verification");
const codeInput = document.getElementById("codeInput");
const verifyButton = document.getElementById("verifyButton");

let verificationCode = ""; // Solo una declaración
signInForm.appendChild(errorMessage);
errorMessage.style.color = "red";

// Validación de email en tiempo real
emailInput.addEventListener("keyup", () => {
  errorMessage.textContent = validateEmail(emailInput.value) ? "" : "Email inválido.";
});

// Validación de contraseña en tiempo real
passwordInput.addEventListener("keyup", () => {
  errorMessage.textContent = passwordInput.value.length >= 6 ? "" : "La contraseña debe tener al menos 6 caracteres.";
});

// Evento de click para el botón de inicio de sesión
signInButton.addEventListener("click", (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  if (!validateEmail(email)) {
    errorMessage.textContent = "Por favor, ingresa un correo electrónico válido.";
    return;
  }

  if (password.length < 6) {
    errorMessage.textContent = "La contraseña debe tener al menos 6 caracteres.";
    return;
  }

  // Verificación de usuario
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    verificationCode = generateVerificationCode();
    errorMessage.textContent = `Inicio de sesión exitoso. Se ha enviado un código de verificación a ${email}.`;
    errorMessage.style.color = "green";
    verificationDiv.style.display = "block";
  } else {
    errorMessage.textContent = "Correo o contraseña incorrectos.";
    errorMessage.style.color = "red";
  }
});

// Código de verificación fijo
const fixedVerificationCode = "cristiano777";

// Evento de click para el botón de verificación
verifyButton.addEventListener("click", (e) => {
  e.preventDefault();
  const enteredCode = codeInput.value;

  if (enteredCode === fixedVerificationCode) {
    const user = users.find(user => user.email === emailInput.value);

    if (user.role === "admin") {
      errorMessage.textContent = "Verificación exitosa. Bienvenido, administrador.";
      window.location.href = "admin_dashboard.html";
    } else {
      errorMessage.textContent = "Verificación exitosa. Bienvenido, usuario.";
      window.location.href = "index.html";
    }
    errorMessage.style.color = "green";
  } else {
    errorMessage.textContent = "Código de verificación incorrecto.";
    errorMessage.style.color = "red";
  }
});

// Función para generar un código de verificación de 6 dígitos
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Función de validación de email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Registro de usuario
document.getElementById("signup-btn").addEventListener("click", function(e) {
  e.preventDefault();
  const email = document.querySelector('.sign-up input[type="text"]').value;
  const password = document.getElementById('password').value;
  const isTermsChecked = document.getElementById('terms-checkbox').checked;

  if (!validateEmail(email)) {
    showError("Por favor, ingresa un correo electrónico válido.");
    return;
  }

  if (users.some(user => user.email === email)) {
    showError("El correo electrónico ya está registrado.");
    return;
  }

  if (!isTermsChecked) {
    alert('Por favor, acepta los términos de servicio y la política de privacidad.');
    return;
  }

  // Agregar nuevo usuario a la lista con rol de usuario regular
  users.push({ email: email, password: password, role: "user" });
  showSuccess("Registro exitoso. Ahora puedes iniciar sesión.");
  container.classList.remove("active");
});

