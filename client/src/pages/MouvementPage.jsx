import ProtectedLayout from '../security/ProtectedRoute'
import Mouvement from '../components/mouvement/Mouvement'

import React from 'react'

function MouvementPage() {
  return (
    <ProtectedLayout>
      <Mouvement />
    </ProtectedLayout>
  )
}

export default MouvementPage
