'use client'
import React, { useEffect, useState } from 'react'
import TreeView from './_chart/TreeView'

export default function ProductCategoryTree() {

    const [tree, setTree]=useState(false)
    useEffect(()=>{
        setTree(true)
    },[])

    return (
        <>
            <div className="main-das-page">

                <div className="heading mb-3">
                    <h3 className='text-blue'>Product Category Tree</h3>
                   {tree && <TreeView />}
                </div>
            </div>

        </>
    )
}
