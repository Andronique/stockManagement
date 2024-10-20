import ProtectedLayout from '../security/ProtectedRoute'
import React from 'react'
import DetailstockInOut from '../components/detailstock/DetailstockInOut'

function Detailstock() {
  return (
    <ProtectedLayout>
      <DetailstockInOut />
    </ProtectedLayout>
  )
}

export default Detailstock
