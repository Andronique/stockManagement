import React from 'react'
import Sortie from '../components/sortie/Sortie'
import ProtectedLayout from '../security/ProtectedRoute'

function SortiePage() {
  return (
    <ProtectedLayout>
      <Sortie />
    </ProtectedLayout>
  )
}

export default SortiePage