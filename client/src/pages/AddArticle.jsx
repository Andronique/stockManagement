import React from 'react'
import FormAjoutArticle from '../components/formAjoutArticle/FormAjoutArticle'
import ProtectedLayout from '../security/ProtectedRoute'


function AddArticle() {
  return (
    <ProtectedLayout>
      <FormAjoutArticle />
    </ProtectedLayout>
  )
}

export default AddArticle
