import {
  saveOrder, 
  getOrders, 
  onGetOrders, 
  deleteOrder, 
  getOrder,
  updateOrder
} from './firebase.js'

import { getUserUid } from '../admin/app/signinForm.js'

const orderForm = document.getElementById('order-form')
const ordersContainer = document.getElementById('orders-container')
const orderEdit = document.getElementById('editForm')

let id = ""

window.addEventListener('DOMContentLoaded', async () => {

  const uid = await getUserUid()
  if(uid === "joUje8YZRQZjYJreYE3Bla0vpsl2"){
    onGetOrders((querySnapshot) => {
      let html = ''
      querySnapshot.forEach(doc => {
        const order = doc.data()
        html += `
        <tr>
          <td>${order.name}</td>
          <td>${order.lastname}</td>
          <td>${order.classroom}</td>
          <td>${order.message}</td>
          <td>${order.dateFormat}</td>
          <td>${order.packpage}</td>
          <td>${order.state}</td> 
          <td>
            <div  class="btn-group">
              <button class='btn btn-danger btn-delete' data-id='${doc.id}'>Delete</button>
              <button class='btn btn-primary btn-edit' data-id='${doc.id}' data-bs-toggle="modal" data-bs-target="#orderEdit">Edit</button>
            </div>
          </td> 
        </tr>
        `
    
      })
    
      ordersContainer.innerHTML = html
  
      const btnsDelete = ordersContainer.querySelectorAll('.btn-delete')
      btnsDelete.forEach(btn => {
        btn.addEventListener('click', ({target:{dataset}}) => {
          deleteOrder(dataset.id)
        })
      })
  
      const btnsEdit = ordersContainer.querySelectorAll('.btn-edit')
      btnsEdit.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const doc = await getOrder(e.target.dataset.id)
          const order = doc.data()
  
          orderEdit['name'].value = order.name
          orderEdit['lastname'].value = order.lastname
          orderEdit['classroom'].value = order.classroom
          orderEdit['message'].value = order.message
          orderEdit['dateFormat'].value = order.dateFormat
  
          orderEdit['packpage'].value = order.packpage
          orderEdit['state'].value = order.state
  
          id = doc.id
  
        })
      })
    })
  }

})

orderEdit.addEventListener('submit', (e) => {
  e.preventDefault()

  const name = orderEdit['name']
  const lastname = orderEdit['lastname']
  const classroom = orderEdit['classroom']
  const message = orderEdit['message']
  const dateFormat = orderEdit['dateFormat']
  const packpage = orderEdit['packpage']
  const state = orderEdit['state']

  updateOrder(id, {
    name: name.value,
    lastname: lastname.value,
    classroom: classroom.value,
    message: message.value,
    dateFormat: dateFormat.value,
    packpage: packpage.value, 
    state: state.value
  })

  orderForm.reset()
})