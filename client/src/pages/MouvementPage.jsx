import ProtectedLayout from '../security/ProtectedRoute'
import Mouvement from '../components/mouvement/Mouvement'
import MouvementEntree from '../components/mouvement/MouvementEntree'
import React from 'react'
import PDFComponent from '../components/mouvement/MouvementEntree'

function MouvementPage() {
  return (
    <ProtectedLayout>
      <Mouvement/>
      {/* <PDFComponent /> */}
    </ProtectedLayout>
  )
}

export default MouvementPage
