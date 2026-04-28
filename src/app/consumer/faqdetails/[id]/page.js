import FaqDetailsComponent from '@/app/_components/FaqDetailsComponent'
import React from 'react'

export default function page({params}) {
    const { id } = React.use(params)
  return (
    <FaqDetailsComponent id={id} />
  )
}
