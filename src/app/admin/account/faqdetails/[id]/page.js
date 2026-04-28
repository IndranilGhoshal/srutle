import FaqDetailsComponent from '@/app/_adminComponents/FaqDetailsComponent'
import React from 'react'

export default function page({ params }) {
    const { id } = React.use(params)
    return (
        <FaqDetailsComponent id={id} />
    )
}
