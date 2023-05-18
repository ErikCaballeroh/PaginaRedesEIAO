import { showMessage } from './index.js'

const password = 's9d$patc#'
var scansound =  new Audio('js/barcode.wav');
// Verificar si la contraseña ya ha sido escaneada
const scanned = localStorage.getItem("scanned");
if (!scanned) {
  // Inicializar Instascan y definir el listener para el evento "scan"
  let scanner = new Instascan.Scanner({ 
    video: document.getElementById("preview"),
    scanPeriod: 5,
    mirror: false
  });
  
  scanner.addListener("scan", function(content) {
    // Obtener el valor escaneado y compararlo con la contraseña correcta
    scansound.play()
    if (content === password) {
      // La contraseña es correcta, guardarla en LocalStorage y desbloquear el formulario
      localStorage.setItem("password", password);
      localStorage.setItem("scanned", true);
      showMessage('Contraseña correcta, formulario desbloqueado', 'success');
      document.getElementById("btn-save").removeAttribute("disabled");
    } else {
      showMessage('Contraseña incorrecta, vuelva a intentarlo', 'danger');
    }
  });

  Instascan.Camera.getCameras().then(function(cameras) {
    if(cameras.length > 0){
      function isMobile() {
          return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      }

      if (isMobile()) {
          scanner.start(cameras[1])
      } else {
          scanner.start(cameras[0])
      }
    
    } else{
    alert('No se han encontrado camaras');
    }
  });

} else {
  // Verificar si la contraseña está guardada en LocalStorage
  const savedPassword = localStorage.getItem("password");
  if (savedPassword === password) {
    showMessage('Contraseña correcta, formulario desbloqueado', 'success');
    document.getElementById("btn-save").removeAttribute("disabled");
    document.getElementById("btn-qr").remove()
  } else {
    showMessage('Contraseña incorrecta, vuelva a intentarlo', 'danger');
    document.getElementById("btn-save").setAttribute("disabled", "disabled");
  }
}