import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyCdrpZcBjErspcOMZBP-joWfOhWlj54HyM",
    authDomain: "redes-eiao.firebaseapp.com",
    projectId: "redes-eiao",
    storageBucket: "redes-eiao.appspot.com",
    messagingSenderId: "167867309502",
    appId: "1:167867309502:web:ef40478b0fa54e2832adef"
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
