import React from 'react'
import ProtectedLayout from '../security/ProtectedRoute'
import FormModifArticle from '../components/formModifArticle/FormModifArticle'

function EditArticle() {
  return (
    <ProtectedLayout>
      <FormModifArticle/>
    </ProtectedLayout>
  )
}

export default EditArticle
