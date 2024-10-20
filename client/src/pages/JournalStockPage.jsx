import React from 'react'
import ProtectedLayout from '../security/ProtectedRoute'
import JournalStock from '../components/journalStock/JournalStock'

function JournalStockPage() {
  return (
    <ProtectedLayout>
       <JournalStock />
    </ProtectedLayout>
  )
}

export default JournalStockPage
