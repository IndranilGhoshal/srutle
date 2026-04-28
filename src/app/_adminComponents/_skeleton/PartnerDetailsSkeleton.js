import { Skeleton } from '@mui/material'
import React from 'react'

export default function PartnerDetailsSkeleton() {
  return (
    <>
    <div className='row'>
        <div className='col-3'>
            <Skeleton width="100%" height={50} />
        </div>
        <div className='col-12'>
            <Skeleton className='mx-auto' variant="circular" width={130} height={130} />
            <Skeleton className='mt-3' width="100%" height={60} />
            <Skeleton className='mt-3' width="100%" height={60} />
            <Skeleton className='mt-3' width="100%" height={60} />
            <Skeleton className='mt-3' width="100%" height={60} />
            <Skeleton className='mt-3' width="100%" height={60} />
            <Skeleton className='mt-3' width="100%" height={60} />
        </div>

    </div>
    </>
  )
}
