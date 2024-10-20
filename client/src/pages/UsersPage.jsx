import React from 'react'
import ProtectedLayout from '../security/ProtectedRoute'
import Users from '../components/users/Users'

function UsersPage() {
  return (
    <ProtectedLayout>
      <Users />
    </ProtectedLayout>
  )
}

export default UsersPage
