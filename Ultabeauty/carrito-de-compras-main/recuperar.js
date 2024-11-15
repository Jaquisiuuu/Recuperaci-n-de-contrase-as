
let user = {
    email: null,
    password: "oldPassword", 
    verificationCode: "123456" // Código estático para verificación en este ejemplo
};

// Simulación de usuarios registrados
const registeredEmails = ["20635@utsc.com", "jaqui07elote@gmail.com", "jackyycoder@outlook.com"];

// Abre el modal de recuperación de contraseña
function openRecoveryModal() {
    document.getElementById("recoveryModal").style.display = "block";
}

// Envía el código de verificación
function sendVerificationCode() {
    const email = document.getElementById("emailInput").value;
    if (registeredEmails.includes(email)) {
        user.email = email; 
        alert(`Código de verificación enviado a: ${email}`);
        document.getElementById("codeField").style.display = "block";
        document.getElementById("errorMessage").innerText = "";
    } else {
        document.getElementById("errorMessage").innerText = "Por favor, ingrese un correo válido.";
    }
}

// Verifica el código de verificación
function verifyCode() {
    const code = document.getElementById("codeInput").value;
    if (code === user.verificationCode) {
        alert("Código verificado correctamente.");
        document.getElementById("recoveryModal").style.display = "none";
        openNewPasswordModal();
    } else {
        document.getElementById("errorMessage").innerText = "Código incorrecto. Inténtelo de nuevo.";
    }
}

// Muestra el modal para cambiar la contraseña
function openNewPasswordModal() {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal-content">
            <h2>UltaBeauty</h2>
            <h3>Registrar Nueva Contraseña</h3>
            <input type="password" id="newPassword" placeholder="Nueva contraseña">
            <input type="password" id="confirmPassword" placeholder="Confirmar contraseña">
            <button onclick="changePassword()">Enviar</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Cambia la contraseña en el objeto usuario y redirige al login principal
function changePassword() {
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (newPassword === confirmPassword && newPassword.length > 0) {
        user.password = newPassword; // Cambia la contraseña en el objeto usuario
        alert("Contraseña cambiada con éxito. Redirigiendo al login...");
        window.location.href = "login.html"; // Redirige a la página de login
    } else {
        alert("Las contraseñas no coinciden. Inténtelo de nuevo.");
    }
}
