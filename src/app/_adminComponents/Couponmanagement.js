'use client'
import React, { useEffect } from 'react'
import { hideLoader } from '../lib/common'

export default function Couponmanagement() {
    useEffect(()=>{
        hideLoader()
    },[])
    return (
        <>
            <div className="main-das-page">

                <div className="heading my-3">
                    <h3 className='text-blue'>Coupon Management</h3>
                </div>
            </div>
        </>
    )
}
