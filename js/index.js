import {
  saveOrder, 
} from './firebase.js'

export function showMessage(message, type) {
  Toastify({
      text: message,
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
          background: type === "success" ? "linear-gradient(to bottom, hsl(120, 70%, 60%), hsl(120, 60%, 50%))" : "linear-gradient(to bottom, hsl(0, 80%, 65%), hsl(0, 70%, 55%))",
      },
      onClick: function(){}
  }).showToast();
}

function validateName(text) {
  const regex = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
  return regex.test(text);
}



const orderForm = document.getElementById('order-form')

const toTitleCase = (str) => {
  return str.replace(/\b\w+/g, function(match) {
    return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
  });
}


orderForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const name = orderForm['name']
  const lastname = orderForm['lastname']
  const classroom = orderForm['classroom']
  const message = orderForm['message']
  let date = new Date()
  const dateFormat = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  const packpage = "No asignado"
  const state = "Pendiente"

  if(!(localStorage.getItem('password') === 's9d$patc#')) {
    showMessage('Se necesita escanear la contraseña', 'danger')
  } else
  if(!name.value || !lastname.value){
    showMessage('No se puede omitir este campo', 'danger')
  } else if(name.value.length < 4 || lastname.value.length < 4){
    showMessage('Use un nombre y apellido de almenos 4 caracteres', 'danger')
  } else if(validateName(name.value) || validateName(lastname.value)) {
    showMessage('El nombre y apellido no debe contener numeros o caracteres especiales', 'danger')
  } else if(!classroom.value){
    showMessage('Seleccione el aula', 'danger')
  } else {
    saveOrder(
      toTitleCase(name.value.trim()), 
      toTitleCase(lastname.value.trim()), 
      classroom.value, 
      message.value.trim(), 
      dateFormat, 
      packpage, 
      state
    )
  
    showMessage('Formulario enviado', 'success')
  
    orderForm.reset()
  }

})
