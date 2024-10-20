import ProtectedLayout from '../security/ProtectedRoute'
import React from 'react'
import DetailStockOutIn from '../components/detailstock/DetailStockOutIn'

function DetailstockOut() {
  return (
    <ProtectedLayout>
      <DetailStockOutIn />
    </ProtectedLayout>
  )
}

export default DetailstockOut
