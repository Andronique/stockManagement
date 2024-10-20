import React from 'react'
import ProtectedLayout from '../security/ProtectedRoute'
import FormEditUser from '../components/formEditUser/FormEditUser'

function EditUser() {
  return (
    <ProtectedLayout>
      <FormEditUser/>
    </ProtectedLayout>
  )
}

export default EditUser
