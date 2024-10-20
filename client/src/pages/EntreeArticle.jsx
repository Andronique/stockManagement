import React from 'react'
import Entree from '../components/entree/entree'
import ProtectedLayout from '../security/ProtectedRoute'

function EntreeArticle() {
  return (
    <ProtectedLayout>
      <Entree />
    </ProtectedLayout>
  )
}

export default EntreeArticle
