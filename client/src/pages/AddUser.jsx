import React from 'react'
import FormAddUser from '../components/formAddUser/FormAddUser'
import ProtectedLayout from '../security/ProtectedRoute'


function AddUser() {
  return (
    <ProtectedLayout>
      <FormAddUser />
    </ProtectedLayout>
  )
}

export default AddUser
