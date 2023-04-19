// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js"
import { 
    getFirestore, 
    collection, 
    addDoc,
    getDocs,
    deleteDoc,
    onSnapshot,
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdrpZcBjErspcOMZBP-joWfOhWlj54HyM",
  authDomain: "redes-eiao.firebaseapp.com",
  projectId: "redes-eiao",
  storageBucket: "redes-eiao.appspot.com",
  messagingSenderId: "167867309502",
  appId: "1:167867309502:web:ef40478b0fa54e2832adef"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

const db = getFirestore()

export const saveOrder = (name, lastname, classroom, message, dateFormat, packpage, state) => 
    addDoc(collection(db, 'orders'), {name, lastname, classroom, message, dateFormat, packpage, state})

export const getOrders = () => getDocs(collection(db, 'orders'))

export const onGetOrders = (callback) => onSnapshot(collection(db, 'orders'), callback)

export const deleteOrder = id => deleteDoc(doc(db, 'orders', id))

export const getOrder = id => getDoc(doc(db, 'orders', id))

export const updateOrder = (id, newFields) => updateDoc(doc(db, 'orders', id), newFields)