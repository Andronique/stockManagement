import React from 'react'
import Home from '../components/home/Home'
import ProtectedLayout from '../security/ProtectedRoute'

function HomePage() {
  return (
        <ProtectedLayout>
          <Home />
        </ProtectedLayout>
  )
}

export default HomePage

