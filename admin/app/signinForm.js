import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js"
import { auth } from './firebase.js'

function showMessage(message, type) {
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
            background: type === "success" ? "linear-gradient(to bottom, #6bbf57, #639c5d)" : "linear-gradient(to bottom, #d53939, #9f2525)",
        },
        onClick: function(){}
    }).showToast();
}

const signInForm = document.querySelector('#login-form')

let userUid = null;

signInForm.addEventListener('submit', async e => {
    e.preventDefault()
    const email = signInForm['email'].value
    const password = signInForm['password'].value

    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        userUid = userCredentials.user.uid
    } catch (error) {
        if (error.code === 'auth/wrong-password') {
            console.error("Wrong password")
            showMessage('Contraseña incorrecta', 'danger')
        } else if (error.code === 'auth/user-not-found') {
            console.error("User not found")
            showMessage('Usuario no encontrado', 'danger')
        } else {
            console.error("Something went wrong")
            showMessage('Usuario o contraseña incorrecto', 'danger')
        }
    }
})

const getUserUid = async () => {
  while (userUid === null) {
    await new Promise(resolve => setTimeout(resolve, 100)) // Espera 100ms antes de verificar si userUid es diferente a null
  }
  showMessage('Sesion iniciada correctamente', 'success')
  return userUid
}

export { getUserUid }