import PartnerDetailsComponent from '@/app/_adminComponents/PartnerDetailsComponent'
import React from 'react'

export default function page({params}) {
  const { id } = React.use(params)
  return (
    <PartnerDetailsComponent id={id} />
  )
}
