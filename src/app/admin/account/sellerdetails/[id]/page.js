import SellerDetailsComponent from '@/app/_adminComponents/SellerDetailsComponent'
import React from 'react'

export default function page({params}) {
  const { id } = React.use(params)
  return (
    <SellerDetailsComponent id={id} />
  )
}
