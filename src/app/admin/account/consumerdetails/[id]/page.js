import ConsumerDetailsComponent from '@/app/_adminComponents/ConsumerDetailsComponent'
import React from 'react'

export default function page({params}) {
  const { id } = React.use(params)
  return (
    <ConsumerDetailsComponent id={id} />
  )
}
